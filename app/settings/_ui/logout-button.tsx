'use client'

import { call_api } from '#lib/api-spec/client'
import { api } from '#common/api'

export
function LogoutButton() {
	return (
		<button
			type='button'
			className='bg-red-500/90 text-white px-4 py-2 rounded-md hover:bg-red-500'
			onClick={async () => {
				await call_api(api.auth.logout, {
					params: null,
					data: null,
				})
				window.location.href = '/'
			}}
		>
			退出登录
		</button>
	)
}
