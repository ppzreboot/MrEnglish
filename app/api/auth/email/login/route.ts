import { NextResponse, type NextRequest } from 'next/server'
import { session_manager } from '#service/auth'
import { user_service } from '#service/user'
import { clone_url } from '#service/util'
import { app_env } from '#service/env'

export
async function POST(request: NextRequest) {
	const ct = request.headers.get('content-type') ?? ''
	if (!ct.includes('application/x-www-form-urlencoded'))
		return NextResponse.json({ error: 'Bad request' }, { status: 400 })

	const form = await request.formData()
	const email = typeof form.get('email') === 'string' ? form.get('email') as string : ''
	const password = typeof form.get('password') === 'string' ? form.get('password') as string : ''
	if (!email.trim() || !password)
		return NextResponse.json({ error: 'Bad request' }, { status: 400 })

	const user = await user_service.verify_email_password(email, password)
	if (!user) {
		const url = clone_url(request, '/login?error=email_login_failed')
		return NextResponse.redirect(url)
	}
	const session_token = await session_manager.create(user.id)
	const response = NextResponse.redirect(clone_url(request, '/'))
	response.cookies.set('session_token', session_token, {
		httpOnly: true,
		secure: app_env.mode === 'pro',
		sameSite: 'lax',
		path: '/',
		maxAge: app_env.session_max_age,
	})
	return response
}
