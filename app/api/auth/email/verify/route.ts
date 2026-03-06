import { z } from 'zod'
import { type NextRequest } from 'next/server'
import { parse_json_body } from '#service/util/parse-body'
import { error400, fail_json, success_json } from '#service/util/respond'
import { email_login } from '#service/auth/login'
import { zod_email } from '#service/util/zod'
import { cookie_manager } from '#service/auth/cookie'

export
async function POST(request: NextRequest) {
	const body = await parse_json_body(request, z.object({
		email: zod_email,
		code: z.string().length(6),
	}))
	if (!body.ok)
		return error400()
	const result = await email_login(body.data.code, body.data.email)
	if (result.error !== null)
		return fail_json(result.error)
	const response = success_json()
	cookie_manager.session_token.set(response, result.token)
	return response
}
