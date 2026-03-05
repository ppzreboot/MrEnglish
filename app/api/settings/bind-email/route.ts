import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { session_manager } from '#service/auth'
import { user_service } from '#service/user'
import { clone_url } from '#service/util'
import { db } from '#service/db'

export
async function POST(request: NextRequest) {
	const cookie_store = await cookies()
	const session_token = cookie_store.get('session_token')?.value
	if (!session_token) {
		return NextResponse.redirect(clone_url(request, '/login'))
	}
	const session = await session_manager.get(session_token)
	if (!session) {
		return NextResponse.redirect(clone_url(request, '/login'))
	}

	const ct = request.headers.get('content-type') ?? ''
	if (!ct.includes('application/x-www-form-urlencoded'))
		return NextResponse.json({ error: 'Bad request' }, { status: 400 })

	const form = await request.formData()
	const email = typeof form.get('email') === 'string' ? (form.get('email') as string).trim().toLowerCase() : ''
	const password = typeof form.get('password') === 'string' ? form.get('password') as string : ''
	if (!email || !password)
		return NextResponse.json({ error: 'Bad request' }, { status: 400 })

	const existing = await db.user.findUnique({
		where: { email },
	})
	if (existing && existing.id !== session.user_id) {
		const url = clone_url(request, '/settings?error=email_taken')
		return NextResponse.redirect(url)
	}
	await user_service.set_email_password(session.user_id, email, password)
	const url = clone_url(request, '/settings?bound=1')
	return NextResponse.redirect(url)
}
