import { redirect } from 'next/navigation'
import { session_manager } from '#service/auth/session'
import { user_service } from '#service/user'
import { Bind_email_form } from './_ui/bind-email-form'
import { LogoutButton } from './_ui/logout-button'

export default
async function Settings_page(props: { searchParams: Promise<{ bound?: string }> }) {
	const session = await session_manager.get()
	if (!session) redirect('/login')
	const user = await user_service.get_by_id(session.user_id)
	if (!user) redirect('/login')

	const query = await props.searchParams
	const bound = query.bound

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
					</p>
				) : (
					<>
						{bound === '1' && (
							<p className='text-green-600 dark:text-green-400 text-sm mb-2'>绑定成功，可使用邮箱验证码登录。</p>
						)}
						<Bind_email_form />
					</>
				)}
			</section>

			<section>
				<h2 className='text-lg font-medium mb-4'>账号</h2>
				<LogoutButton />
			</section>
		</div>
	)
}
