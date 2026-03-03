import { cookies } from 'next/headers'
import { session_manager } from '#service/auth'
import { user_service } from '#service/user'

export default
async function home_page() {
	const cookie_store = await cookies()
	const token = cookie_store.get('token')?.value

	let logged_in = false
	if (token) {
		const session = session_manager.get(token)
		if (session) {
			const user = await user_service.get_by_id(session.user_id)
			if (user)
				logged_in = true
		}
	}

	if (logged_in)
		return (
			<div className='p-10'>
				<h1 className='text-2xl mb-4'>Home</h1>
				<form action='/api/auth/logout' method='POST'>
					<button type='submit' className='bg-red-500 text-white px-4 py-2 rounded'>Logout</button>
				</form>
			</div>
		)

	return (
		<div className='flex h-screen items-center justify-center'>
			<a href='/api/auth/github/login' className='bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition-colors'>
				Login with GitHub
			</a>
		</div>
	)
}
