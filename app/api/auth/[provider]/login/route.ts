import { NextResponse } from 'next/server'
import { get_oauth2_provider, is_oauth2_provider_key } from '#service/auth'
import { app_env } from '#service/env'

export
async function GET(
	_: Request,
	{ params }: RouteContext<'/api/auth/[provider]/login'>,
) {
	const { provider: provider_key } = await params
	if (!is_oauth2_provider_key(provider_key))
		return NextResponse.json({ error: 'Invalid provider' }, { status: 400 })
	const provider = get_oauth2_provider(provider_key)

	const state = Math.random().toString(36).substring(7)
	const url = await provider.get_auth_url(state)
	const response = NextResponse.redirect(url)

	response.cookies.set('oauth_state', state, {
		httpOnly: true,
		secure: app_env.mode === 'pro',
		sameSite: 'lax',
		path: '/',
		maxAge: 120, // 2 minute
	})

	return response
}
