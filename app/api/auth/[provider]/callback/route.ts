import { type NextRequest, NextResponse } from 'next/server'
import { is_oauth2_provider_key } from '#service/auth/oauth2'
import { clone_url } from '#service/util/clone-url'
import { cookie_manager } from '#service/auth/cookie'
import { oauth2_login } from '#service/auth/login'
import { error400 } from '#service/util/respond'

export
async function GET(
	request: NextRequest,
	ctx: RouteContext<'/api/auth/[provider]/callback'>,
) {
	// validate provider key
	const { provider } = await ctx.params
	if (!is_oauth2_provider_key(provider)) {
		console.error('Invalid oauth2 provider', provider)
		return error400()
	}

	// get code and state from query parameters
	const { searchParams } = new URL(request.url)
	const code = searchParams.get('code')
	const query_state = searchParams.get('state')
	if (!code || !query_state) {
		console.error('Missing code or state', code, query_state)
		return error400()
	}

	// validate oauth state
	const cookie_state = await cookie_manager.oauth2_state.get()
	if (cookie_state === null || query_state !== cookie_state) {
		console.error('invalid oauth state: cookie_state', cookie_state, 'query_state', query_state)
		return error400()
	}

	// login
	const session_token = await oauth2_login(provider, code)

	// make response
	const response = NextResponse.redirect(clone_url(request))
	// respond session token in cookies
	cookie_manager.session_token.set(response, session_token)
	// respond
	return response
}
