import { NextResponse } from 'next/server'
import { session_manager } from '#service/auth/session'
import { error400 } from '#service/util/respond'
import { cookie_manager } from '#service/auth/cookie'

export
async function POST() {
	const session_token = await cookie_manager.session_token.get()

	if (session_token === null)
		return error400()

	await session_manager.delete(session_token)
	const response = NextResponse.json({ success: true })
	cookie_manager.session_token.delete(response)
	return response
}
