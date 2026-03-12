import Link from 'next/link'
import { redirect } from 'next/navigation'
import { session_manager } from '#service/auth/session'
import { LogoutButton } from './_ui/logout-button'

export default
async function Settings_page() {
	const user = await session_manager.get_user()
	if (!user)
		return redirect('/login')

	return (
		<div className='min-h-screen p-8 max-w-lg mx-auto'>
			<h1 className='text-2xl font-semibold mb-8'>设置</h1>

			<section className='mb-8'>
				<h2 className='text-lg font-medium mb-4'>绑定邮箱</h2>
				{user.email ? (
					<p className='text-neutral-600 dark:text-neutral-400'>
						已绑定：<span className='font-mono'>{user.email}</span>
						<br />
						<span className='text-sm'>可使用该邮箱验证码登录。</span>
						<br />
						<Link href='/settings/email' className='text-sm text-neutral-500 hover:underline'>
							更换邮箱
						</Link>
					</p>
				) : (
					<Link
						href='/settings/email'
						className='text-neutral-600 dark:text-neutral-400 hover:underline'
					>
						去绑定邮箱 →
					</Link>
				)}
			</section>

			<section>
				<h2 className='text-lg font-medium mb-4'>账号</h2>
				<LogoutButton />
			</section>
		</div>
	)
}
