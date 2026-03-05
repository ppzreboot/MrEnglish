import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { session_manager } from '#service/auth'
import { user_service } from '#service/user'

export default
async function settings_page({
	searchParams,
}: {
	searchParams: Promise<{ error?: string; bound?: string }>
}) {
	const cookie_store = await cookies()
	const session_token = cookie_store.get('session_token')?.value
	if (!session_token) redirect('/login')
	const session = await session_manager.get(session_token)
	if (!session) redirect('/login')
	const user = await user_service.get_by_id(session.user_id)
	if (!user) redirect('/login')

	const params = await searchParams
	const error = params.error
	const bound = params.bound

	return (
		<div className="min-h-screen p-8 max-w-lg mx-auto">
			<h1 className="text-2xl font-semibold mb-8">设置</h1>

			<section className="mb-8">
				<h2 className="text-lg font-medium mb-4">绑定邮箱</h2>
				{user.email ? (
					<p className="text-neutral-600 dark:text-neutral-400">
						已绑定：<span className="font-mono">{user.email}</span>
						<br />
						<span className="text-sm">可使用该邮箱 + 密码登录。</span>
					</p>
				) : (
					<>
						{error === 'bind_missing' && (
							<p className="text-amber-600 dark:text-amber-400 text-sm mb-2">请填写邮箱和密码。</p>
						)}
						{error === 'email_taken' && (
							<p className="text-amber-600 dark:text-amber-400 text-sm mb-2">该邮箱已被其他账号使用。</p>
						)}
						{bound === '1' && (
							<p className="text-green-600 dark:text-green-400 text-sm mb-2">绑定成功，可使用邮箱+密码登录。</p>
						)}
						<form action="/api/settings/bind-email" method="POST" className="space-y-3">
							<div>
								<label htmlFor="bind-email" className="block text-sm font-medium mb-1">邮箱</label>
								<input
									id="bind-email"
									name="email"
									type="email"
									required
									className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-inherit"
									placeholder="your@email.com"
								/>
							</div>
							<div>
								<label htmlFor="bind-password" className="block text-sm font-medium mb-1">密码</label>
								<input
									id="bind-password"
									name="password"
									type="password"
									required
									minLength={6}
									className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-inherit"
									placeholder="至少 6 位"
								/>
							</div>
							<button
								type="submit"
								className="bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black px-4 py-2 rounded-md hover:opacity-90"
							>
								绑定邮箱
							</button>
						</form>
					</>
				)}
			</section>

			<section>
				<h2 className="text-lg font-medium mb-4">账号</h2>
				<form action="/api/auth/logout" method="POST">
					<button
						type="submit"
						className="bg-red-500/90 text-white px-4 py-2 rounded-md hover:bg-red-500"
					>
						退出登录
					</button>
				</form>
			</section>
		</div>
	)
}
