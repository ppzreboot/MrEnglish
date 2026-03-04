import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { user_service } from '#service/user'
import { session_manager, get_auth_provider } from '#service/auth'
import { app_env } from '#service/env'

export async function GET(
	request: Request,
	ctx: RouteContext<'/api/auth/[provider]/callback'>,
) {
	// Validate provider key
	const { provider: provider_key } = await ctx.params
	if (provider_key !== 'github')
		return NextResponse.json({ error: 'Invalid provider' }, { status: 400 })
	const provider = get_auth_provider(provider_key)

	// Get code and state from query parameters
	const { searchParams } = new URL(request.url)
	const code = searchParams.get('code')
	const state = searchParams.get('state')
	if (!code || !state)
		return NextResponse.json({ error: 'Missing code or state' }, { status: 400 })

	// validate oauth state
	const cookie_store = await cookies()
	const cookie_name = 'oauth_state'
	const stored_state = cookie_store.get(cookie_name)?.value
	if (!stored_state || state !== stored_state)
		return NextResponse.json({ error: 'Invalid state' }, { status: 400 })

	// id from provider
	const provider_id = await provider.get_user_info(code)

	// retrieve user (create one if not exist)
	const user = await user_service.retrieve_by_provider({
		provider: provider_key,
		provider_id,
	})

	// Create session
	console.log('new session for user', user)
	const session_token = session_manager.create(user.id)

	// Set cookie
	const response = NextResponse.redirect(new URL('/', request.url))
	response.cookies.set('session_token', session_token, {
		httpOnly: true,
		secure: app_env.mode === 'pro', // https
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 7, // TODO: 放在 .env 里
	})

	// Clear oauth state cookie
	response.cookies.delete(cookie_name)

	return response
}
