import { z } from 'zod'
import { API } from '#lib/api-spec/server'
import { api } from '#common/api'
import { session_manager } from '#service/auth/session'
import { create_and_send_email_code } from '#service/email'
import { parse_input } from '#service/util/parse-input'
import { error400, error401, fail, empty_success } from '#service/util/respond'
import { zod_email } from '#service/util/zod'

export
const POST = API(api.settings.email.send_code, async input => {
	const session = await session_manager.get()
	if (session === null)
		return error401()

	const result = parse_input(await input.data(), z.object({
		email: zod_email,
	}))
	if (!result.ok)
		return error400()

	const error = await create_and_send_email_code(result.data.email, 'bind_email')
	if (error !== null)
		return fail(error)
	return empty_success()
})
