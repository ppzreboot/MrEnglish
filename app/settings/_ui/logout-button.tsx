'use client'

import { useState } from 'react'
import { call_api } from '#common/api'

export
function LogoutButton() {
	const [loading, set_loading] = useState(false)
	return (
		<button
			type='button'
			disabled={loading}
			className='bg-red-500/90 text-white px-4 py-2 rounded-md hover:bg-red-500 disabled:opacity-50'
			onClick={async () => {
				set_loading(true)
				try {
					await call_api('POST', '/logout')
				} catch {
					// 网络异常时仍跳转首页，本地会话可视为已失效
				}
				window.location.href = '/'
			}}
		>
			{loading ? '退出中…' : '退出登录'}
		</button>
	)
}
