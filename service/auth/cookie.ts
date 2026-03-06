import { cookies } from 'next/headers'
import { type NextResponse } from 'next/server'
import { app_env } from '#service/env'

interface I_cookie_item {
	get(): Promise<string | null>
	set(response: NextResponse, value: string): void
	delete(response: NextResponse): void
}

export
const cookie_manager = {
	oauth2_state: make_cookie_item('oauth2_state', 60 * 2),
	session_token: make_cookie_item('session_token', app_env.session_max_age),
}

function make_cookie_item(key: string, max_age: number): I_cookie_item {
	return {
		async get() {
			const cookie_store = await cookies()
			const c = cookie_store.get(key)
			if (c === undefined)
				return null
			return c.value
		},
		async set(response, value) {
			response.cookies.set(key, value, {
				httpOnly: true,
				secure: app_env.mode === 'pro',
				sameSite: 'lax',
				path: '/',
				maxAge: max_age,
			})
		},
		async delete(response) {
			response.cookies.delete(key)
		},
	}
}
