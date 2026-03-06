import { cookies } from 'next/headers'
import Link from 'next/link'
import { session_manager } from '#service/auth/session'
import { user_service } from '#service/user'

export default
async function home_page() {
	const session = await session_manager.get()

	if (session !== null)
		return (
			<div className='p-10'>
				<Link
					href='/settings'
					className='text-neutral-600 dark:text-neutral-400 hover:underline'
				>
					设置
				</Link>
			</div>
		)

	return (
		<div className='p-10'>
			<Link
				href='/login'
				className='text-neutral-600 dark:text-neutral-400 hover:underline'
			>
				登录
			</Link>
		</div>
	)
}
