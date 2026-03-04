import { app_env } from '#service/env'
import type { I_auth_provider } from './type'

export
const github_provider: I_auth_provider = {
	key: 'github',

	async get_auth_url(state: string): Promise<string> {
		const params = new URLSearchParams({
			client_id: app_env.GitHub_client_id,
			state,
		})
		return `https://github.com/login/oauth/authorize?${params.toString()}`
	},

	async get_user_info(code: string) {
		// Exchange code for access token
		const token_res = await fetch('https://github.com/login/oauth/access_token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				client_id: app_env.GitHub_client_id,
				client_secret: app_env.GitHub_client_secret,
				code,
			}),
		})
		// parse access_token
		const token_data = await token_res.json()
		if (token_data.error)
			throw new Error(token_data.error_description || 'Failed to get access token')
		const access_token = token_data.access_token

		// Get provider's user_id
		const user_res = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})
		if (!user_res.ok)
			throw new Error('Failed to fetch user info')
		const user_data = await user_res.json()
		return String(user_data.id) // 确保是字符串
	},
}
