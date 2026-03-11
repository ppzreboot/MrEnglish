import { z } from 'zod'
import { API } from '#lib/api-spec/server'
import { api } from '#common/api'
import { create_and_send_email_code } from '#service/email'
import { user_service } from '#service/user'
import { fail, empty_success, error400 } from '#service/util/respond'
import { zod_email } from '#service/util/zod'

export
const POST = API(api.auth.login.email.send_code, async input => {
	const body = await input.data(
		z.object({
			email: zod_email,
		})
	)
	if (!body.ok)
		return error400()

	const user = await user_service.get_by_email(body.data.email)
	if (!user)
		// 未注册邮箱不发验证码，但返回成功以免泄露该邮箱是否已注册
		return empty_success()

	const error = await create_and_send_email_code(body.data.email, 'login')
	if (error !== null)
		return fail('429')
	return empty_success()
})
