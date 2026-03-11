'use client'

import { useState } from 'react'
import { call_api } from '#lib/api-spec/client'
import { api } from '#common/api'
import { is_email } from '#common/utils/check'

export function Bind_email_form() {
	const [email, set_email] = useState('')
	const [code, set_code] = useState('')
	const [sent, set_sent] = useState(false)
	const [sending, set_sending] = useState(false)
	const [error, set_error] = useState<string | null>(null)

	async function on_send_code() {
		set_sending(true)
		set_error(null)
		if (!email) {
			set_error('邮箱不能为空')
			return
		}
		if (!is_email(email)) {
			set_error('邮箱格式不正确')
			return
		}
		try {
			const result = await call_api(api.settings.email.send_code, {
				params: null,
				data: { email },
			})
			if (!result.ok) {
				set_error(result.error)
				return
			}
			set_sent(true)
		} catch (err) {
			set_error(err instanceof Error ? err.message : '发送失败')
		} finally {
			set_sending(false)
		}
	}

	async function on_verify() {
		set_error(null)
		const result = await call_api(api.settings.email.verify, {
			params: null,
			data: { email, code },
		})
		if (!result.ok) {
			set_error('验证码错误或已过期')
			return
		}
	}

	return (
		<>
			{sent ? (
				<div className='space-y-3'>
					<div>
						<p className='text-sm font-medium mb-1'>验证码</p>
						<input
							inputMode='numeric'
							autoComplete='one-time-code'
							placeholder='请输入验证码'
							value={code}
							onChange={(e) => set_code(e.target.value.trim())}
							onKeyDown={(e) => e.key === 'Enter' && on_verify()}
							className='w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-inherit'
						/>
					</div>
					{error && <p className='text-amber-600 dark:text-amber-400 text-sm'>{error}</p>}
					<button
						type='button'
						onClick={() => on_verify()}
						className='bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black px-4 py-2 rounded-md hover:opacity-90'
					>
						确认绑定
					</button>
					<button
						type='button'
						onClick={() => { set_sent(false); set_code(''); set_error(null); }}
						className='block text-sm text-neutral-500 hover:underline'
					>
						更换邮箱
					</button>
				</div>
			) : (
				<div className='space-y-3'>
					<div>
						<p className='text-sm font-medium mb-1'>邮箱</p>
						<input
							type='email'
							placeholder='your@email.com'
							value={email}
							onChange={(e) => set_email(e.target.value.trim())}
							onKeyDown={(e) => e.key === 'Enter' && on_send_code()}
							className='w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-inherit'
						/>
					</div>
					{error && <p className='text-amber-600 dark:text-amber-400 text-sm'>{error}</p>}
					<button
						type='button'
						onClick={() => on_send_code()}
						className='bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50'
					>
						{sending ? '发送中…' : '发送验证码'}
					</button>
				</div>
			)}
		</>
	)
}
