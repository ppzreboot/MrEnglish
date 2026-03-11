import { z } from 'zod'
import { API } from '#lib/api-spec/server'
import { api } from '#common/api'
import { error400, fail, success_json } from '#service/util/respond'
import { email_login } from '#service/auth/login'
import { zod_email } from '#service/util/zod'
import { cookie_manager } from '#service/auth/cookie'

export
const POST = API(api.auth.login.email.verify, async input => {
	const body = await input.data(
		z.object({
			email: zod_email,
			code: z.string().length(6),
		})
	)
	if (!body.ok)
		return error400()
	const result = await email_login(body.data.code, body.data.email)
	if (result.error !== null)
		return fail(result.error)
	const response = success_json()
	cookie_manager.session_token.set(response, result.token)
	return response
})
