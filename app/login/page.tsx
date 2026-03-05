import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: '登录',
}

export default
async function login_page({
	searchParams,
}: {
	searchParams: Promise<{ error?: string }>
}) {
	const params = await searchParams
	const error = params.error

	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<div className="w-full max-w-sm space-y-6">
				<h1 className="text-xl font-semibold text-center">登录</h1>
				{error === 'email_login_failed' && (
					<p className="text-amber-600 dark:text-amber-400 text-sm text-center">邮箱或密码错误。</p>
				)}
				<div className="space-y-3">
					<p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">邮箱 + 密码</p>
					<form action="/api/auth/email/login" method="POST" className="space-y-2">
						<input
							name="email"
							type="email"
							required
							placeholder="邮箱"
							className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-inherit"
						/>
						<input
							name="password"
							type="password"
							required
							placeholder="密码"
							className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-inherit"
						/>
						<button
							type="submit"
							className="w-full bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black py-2 rounded-md hover:opacity-90"
						>
							登录
						</button>
					</form>
				</div>
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t border-neutral-300 dark:border-neutral-600" />
					</div>
					<div className="relative flex justify-center text-xs text-neutral-500">
						<span className="bg-[var(--background)] px-2">或</span>
					</div>
				</div>
				<a
					href="/api/auth/github/login"
					className="block w-full text-center bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg hover:opacity-90 transition-opacity"
				>
					Login with GitHub
				</a>
				<p className="text-center text-sm text-neutral-500">
					<Link href="/" className="hover:underline">返回首页</Link>
				</p>
			</div>
		</div>
	)
}
