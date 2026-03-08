import { z } from 'zod'
import { type NextRequest } from 'next/server'
import { session_manager } from '#service/auth/session'
import { user_service } from '#service/user'
import { verify_email_code } from '#service/email'
import { db } from '#service/db'
import { parse_json_body } from '#service/util/parse-body'
import { error400, error401, fail_json, success_json } from '#service/util/respond'
import { zod_email } from '#service/util/zod'

export
async function POST(request: NextRequest) {
	const session = await session_manager.get()
	if (session === null)
		return error401()
	const body = await parse_json_body(request, z.object({
		email: zod_email,
		code: z.string().length(6),
	}))
	if (!body.ok)
		return error400()

	return db.$transaction(async tx => {
		const ok = await verify_email_code(body.data.email, body.data.code, 'bind_email')
		if (!ok)
			return fail_json('验证码错误或已过期')
		const existing = await tx.user.findUnique({
			where: { email: body.data.email }
		})
		if (existing)
			return fail_json('该邮箱已被其他账号使用')

		await user_service.set_email(session.user_id, body.data.email)
		return success_json()
	})
}
