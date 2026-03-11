import { z } from 'zod'
import { API } from '#lib/api-spec/server'
import { api } from '#common/api'
import { session_manager } from '#service/auth/session'
import { user_service } from '#service/user'
import { verify_email_code } from '#service/email'
import { db } from '#service/db'
import { error400, error401, fail, empty_success } from '#service/util/respond'
import { zod_email } from '#service/util/zod'

export
const POST = API(api.settings.email.verify, async input => {
	const session = await session_manager.get()
	if (session === null)
		return error401()
	const body = await input.data(
		z.object({
			email: zod_email,
			code: z.string().length(6),
		})
	)
	if (!body.ok)
		return error400()

	return db.$transaction(async tx => {
		const ok = await verify_email_code(body.data.email, body.data.code, 'bind_email')
		if (!ok)
			return fail('wrong_code')
		const existing = await tx.user.findUnique({
			where: { email: body.data.email }
		})
		if (existing)
			return fail('email_taken')

		await user_service.set_email(session.user_id, body.data.email)
		return empty_success()
	})
})
