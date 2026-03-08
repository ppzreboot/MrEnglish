import type { Metadata } from 'next'
import Link from 'next/link'
import { Email_login_form } from './_ui/email-login-form'

export const metadata: Metadata = {
	title: '登录',
}

export default
async function login_page() {
	return (
		<div className='flex min-h-screen items-center justify-center p-6'>
			<div className='w-full max-w-sm space-y-6'>
				<h1 className='text-xl font-semibold text-center'>登录</h1>
				<Email_login_form />
				<div className='relative'>
					<div className='absolute inset-0 flex items-center'>
						<span className='w-full border-t border-neutral-300 dark:border-neutral-600' />
					</div>
					<div className='relative flex justify-center text-xs text-neutral-500'>
						<span className='bg-[var(--background)] px-2'>或</span>
					</div>
				</div>
				<a
					href='/api/auth/github/login'
					className='block w-full text-center bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg hover:opacity-90 transition-opacity'
				>
					Login with GitHub
				</a>
				<p className='text-center text-sm text-neutral-500'>
					<Link href='/' className='hover:underline'>返回首页</Link>
				</p>
			</div>
		</div>
	)
}
