import { randomInt } from 'node:crypto'
import { db } from '#service/db'
import { app_env } from '#service/env'
import { Resend } from 'resend'
import { email_code_length } from '#common/utils/check'

const EXPIRE_MINUTES = 10
const resend = new Resend(app_env.resend_apikey)

function generate_code(): string {
	let s = ''
	for (let i = 0; i < email_code_length; i++)
		s += randomInt(0, 10).toString()
	return s
}

export
async function create_and_send_email_code(email: string): Promise<void> {
	const code = generate_code()
	const expire_at = new Date(Date.now() + EXPIRE_MINUTES * 60 * 1000)
	await db.email_verification_code.upsert({
		where: { email },
		create: { email, code, expire_at },
		update: { code, expire_at },
	})
	await resend.emails.send({
		from: app_env.email_from,
		to: email,
		subject: 'Project-A 验证码',
		text: `您的验证码是：${code}，${EXPIRE_MINUTES} 分钟内有效。`,
	})
}

export
async function verify_email_code(email: string, code: string): Promise<boolean> {
	const row = await db.email_verification_code.findUnique({
		where: {
			email,
			code,
			expire_at: { gt: new Date() },
		},
	})
	return row !== null
}
