import { session_manager } from '#service/auth/session'
import { success_json } from '#service/util/respond'
import { cookie_manager } from '#service/auth/cookie'

export
async function POST() {
	const response = success_json()
	// delete session
	const session_token = await cookie_manager.session_token.get()
	if (session_token !== null) {
		await session_manager.delete(session_token)
		cookie_manager.session_token.delete(response)
	}
	return response
}
