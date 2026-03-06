import { z } from 'zod'
import { type NextRequest } from 'next/server'
import { create_and_send_email_code } from '#service/email'
import { user_service } from '#service/user'
import { parse_json_body } from '#service/util/parse-body'
import { error400, success_json } from '#service/util/respond'
import { zod_email } from '#service/util/zod'

export
async function POST(request: NextRequest) {
	const body = await parse_json_body(request, z.object({
		email: zod_email,
	}))
	if (!body.ok)
		return error400()

	const user = await user_service.get_by_email(body.data.email)
	if (!user)
		// 未注册邮箱不发验证码，但返回成功以免泄露该邮箱是否已注册
		return success_json()

	await create_and_send_email_code(body.data.email)
	return success_json()
}
