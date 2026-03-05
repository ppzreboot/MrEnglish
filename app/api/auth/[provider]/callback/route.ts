import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { user_service } from '#service/user'
import { session_manager, get_oauth2_provider, is_oauth2_provider_key } from '#service/auth'
import { clone_url } from '#service/util'
import { app_env } from '#service/env'

export
async function GET(
	request: NextRequest,
	ctx: RouteContext<'/api/auth/[provider]/callback'>,
) {
	// Validate provider key
	const { provider: provider_key } = await ctx.params
	if (!is_oauth2_provider_key(provider_key))
		return NextResponse.json({ error: 'Invalid provider' }, { status: 400 })
	const provider = get_oauth2_provider(provider_key)

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
	const session_token = await session_manager.create(user.id)

	const response = NextResponse.redirect(clone_url(request))
	// Set cookie
	response.cookies.set('session_token', session_token, {
		httpOnly: true,
		secure: app_env.mode === 'pro', // https
		sameSite: 'lax',
		path: '/',
		maxAge: app_env.session_max_age,
	})

	// Clear oauth state cookie
	response.cookies.delete(cookie_name)

	return response
}
