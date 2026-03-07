import { randomInt } from 'node:crypto'
import { db } from '#service/db'
import { app_env } from '#service/env'
import { Resend } from 'resend'
import { email_code_length } from '#common/utils/check'

const EXPIRE_MINUTES = 10
/** 同一邮箱同一用途下，两次发送验证码的最小间隔（秒） */
const SEND_INTERVAL_SECONDS = 60
const resend = new Resend(app_env.resend_apikey)

export type Email_code_purpose = 'login' | 'bind_email'

const PURPOSE_LABELS: Record<Email_code_purpose, { subject: string; intro: string }> = {
	login:      { subject: 'Project-A 登录验证码',      intro: '您正在使用邮箱验证码登录，' },
	bind_email: { subject: 'Project-A 绑定邮箱验证码',  intro: '您正在绑定邮箱，' },
}

function generate_code(): string {
	let s = ''
	for (let i = 0; i < email_code_length; i++)
		s += randomInt(0, 10).toString()
	return s
}

export
async function create_and_send_email_code(email: string, purpose: Email_code_purpose): Promise<null | '429'> {
	// 检查是否在发送间隔内
	const existing = await db.email_verification_code.findUnique({
		where: { email_purpose: { email, purpose } },
	})
	if (existing) {
		const elapsed_ms = Date.now() - existing.create_at.getTime()
		if (elapsed_ms < SEND_INTERVAL_SECONDS * 1000)
			return '429'
	}

	// 生成并保存验证码
	const code = generate_code()
	const create_at = new Date()
	await db.email_verification_code.upsert({
		where: { email_purpose: { email, purpose } },
		create: { email, purpose, code, create_at },
		update: { code, create_at },
	})

	// 发送验证码
	const { subject, intro } = PURPOSE_LABELS[purpose]
	await resend.emails.send({
		from: app_env.email_from,
		to: email,
		subject,
		text: `${intro}验证码是：${code}，${EXPIRE_MINUTES} 分钟内有效。`,
	})
	return null
}

export
async function verify_email_code(email: string, code: string, purpose: Email_code_purpose): Promise<boolean> {
	const row = await db.email_verification_code.findUnique({
		where: { email_purpose: { email, purpose } },
	})
	if (row === null || row.code !== code)
		return false
	const expire_at_ms = row.create_at.getTime() + EXPIRE_MINUTES * 60 * 1000
	if (Date.now() > expire_at_ms)
		return false
	return true
}
