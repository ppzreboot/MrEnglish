import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { error400, fail, success_json } from '#service/util/respond'
import { email_login } from '#service/auth/login'
import { parse_input } from '#service/util/parse-input'
import { zod_email } from '#service/util/zod'
import { cookie_manager } from '#service/auth/cookie'

export
async function POST(req: NextRequest) {
	const body = parse_input(await req.json(),
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
}
