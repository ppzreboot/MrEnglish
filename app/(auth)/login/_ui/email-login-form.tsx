'use client'

import { useState } from 'react'
import { email_code_length, is_email } from '#common/utils/check'
import { call_api } from '#common/api'

export function Email_login_form() {
	const [email, set_email] = useState('')
	const [code, set_code] = useState('')
	const [sent, set_sent] = useState(false)
	const [sending, set_sending] = useState(false)
	const [error, set_error] = useState<string | null>(null)

	async function on_send_code() {
		if (!email) {
			set_error('邮箱不能为空')
			return
		}
		if (!is_email(email)) {
			set_error('邮箱格式不正确')
			return
		}

		set_error(null)
		set_sending(true)

		try {
			const result = await call_api(
				'POST',
				'/login/email/send-code',
				{
					type: 'body',
					data: { email },
				},
			)
			if (result.ok) {
				set_sent(true)
			} else {
				set_error('太频繁')
			}
		} finally {
			set_sending(false)
		}
	}

	async function on_verify() {
		if (code === '') {
			set_error('验证码不能为空')
			return
		}
		if (code.length !== email_code_length) {
			set_error('验证码长度不正确')
			return
		}

		set_error(null)
		const result = await call_api(
			'POST',
			'/login/email/verify',
			{
				type: 'body',
				data: { email, code },
			}
		)
		if (result.ok) {
			window.location.href = '/'
		} else {
			set_error('验证码错误或已过期')
		}
	}

	return (
		<div className='space-y-3'>
			<p className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>邮箱验证码登录</p>
			{sent ? (
				<div className='space-y-2'>
					<input
						type='text'
						inputMode='numeric'
						autoComplete='one-time-code'
						placeholder='验证码'
						value={code}
						onChange={e => set_code(e.target.value.trim())}
						onKeyDown={e => e.key === 'Enter' && on_verify()}
						className='w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-inherit'
					/>
					{error &&
						<p className='text-amber-600 dark:text-amber-400 text-sm'>{error}</p>
					}
					<button
						type='button'
						onClick={on_verify}
						className='w-full bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black py-2 rounded-md hover:opacity-90'
					>
						登录
					</button>
				</div>
			) : (
				<div className='space-y-2'>
					<input
						type='email'
						placeholder='邮箱'
						value={email}
						onChange={e => set_email(e.target.value.trim())}
						onKeyDown={e => e.key === 'Enter' && on_send_code()}
						className='w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-inherit'
					/>
					{error &&
						<p className='text-amber-600 dark:text-amber-400 text-sm'>{error}</p>
					}
					<button
						type='button'
						onClick={on_send_code}
						disabled={sending}
						className='w-full bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black py-2 rounded-md hover:opacity-90 disabled:opacity-50'
					>
						{sending ? '发送中…' : '发送验证码'}
					</button>
				</div>
			)}
		</div>
	)
}
