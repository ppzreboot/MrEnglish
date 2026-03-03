import { NextResponse } from 'next/server'
import { get_auth_provider, I_auth_provider_key } from '#service/auth'

export async function GET(
	_: Request,
	{ params }: RouteContext<'/api/auth/[provider]/login'>,
) {
	const { provider: provider_key } = await params
	if (provider_key !== 'github')
		return NextResponse.json({ error: 'Invalid provider' }, { status: 400 })
	const redirect_uri = `/api/auth/${provider_key}/callback`
	const provider = get_auth_provider(provider_key)

	const state = Math.random().toString(36).substring(7)
	const url = await provider.get_auth_url(redirect_uri, state)
	const response = NextResponse.redirect(url)

	response.cookies.set(`${provider_key}_auth_state`, state, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: 60, // 1 minute
	})

	return response
}
