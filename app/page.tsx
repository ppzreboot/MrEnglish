import { cookies } from 'next/headers'
import Link from 'next/link'
import { session_manager } from '#service/auth'
import { user_service } from '#service/user'

export default
async function home_page() {
	const cookie_store = await cookies()
	const session_token = cookie_store.get('session_token')?.value

	let logged_in = false
	if (session_token) {
		const session = await session_manager.get(session_token)
		if (session) {
			const user = await user_service.get_by_id(session.user_id)
			if (user) logged_in = true
		}
	}

	if (logged_in)
		return (
			<div className="p-10">
				<Link
					href="/settings"
					className="text-neutral-600 dark:text-neutral-400 hover:underline"
				>
					设置
				</Link>
			</div>
		)

	return (
		<div className="p-10">
			<Link
				href="/login"
				className="text-neutral-600 dark:text-neutral-400 hover:underline"
			>
				登录
			</Link>
		</div>
	)
}
