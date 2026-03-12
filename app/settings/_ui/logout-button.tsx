'use client'

import { call_api } from '#common/api'

export
function LogoutButton() {
	return (
		<button
			type='button'
			className='bg-red-500/90 text-white px-4 py-2 rounded-md hover:bg-red-500'
			onClick={async () => {
				await call_api('POST', '/logout')
				window.location.href = '/'
			}}
		>
			退出登录
		</button>
	)
}
