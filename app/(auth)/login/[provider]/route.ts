import { type NextRequest, NextResponse } from 'next/server'
import { get_oauth2_provider, is_oauth2_provider_key } from '#service/auth/oauth2'
import { error400 } from '#service/util/respond'
import { cookie_manager } from '#service/auth/cookie'

export
async function GET(
	_: NextRequest,
	{ params }: RouteContext<'/login/[provider]'>,
) {
	const { provider } = await params
	if (!is_oauth2_provider_key(provider)) {
		console.error('Invalid oauth2 provider', provider)
		return error400()
	}

	const oauth2_state = Math.random().toString(36).substring(7)
	const url = await get_oauth2_provider(provider).get_auth_url(oauth2_state)
	const response = NextResponse.redirect(url)
	cookie_manager.oauth2_state.set(response, oauth2_state)
	return response
}
