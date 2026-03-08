import { z } from 'zod'
import { type NextRequest } from 'next/server'
import { session_manager } from '#service/auth/session'
import { create_and_send_email_code } from '#service/email'
import { parse_json_body } from '#service/util/parse-body'
import { error400, error401, fail_json, success_json } from '#service/util/respond'
import { zod_email } from '#service/util/zod'

export
async function POST(request: NextRequest) {
	const session = await session_manager.get()
	if (session === null)
		return error401()

	const result = await parse_json_body(request, z.object({
		email: zod_email,
	}))
	if (!result.ok)
		return error400()

	const error = await create_and_send_email_code(result.data.email, 'bind_email')
	if (error !== null)
		return fail_json(error)
	return success_json()
}
