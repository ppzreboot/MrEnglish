import { RT, I_api_spec } from '#lib/api-spec/client'

export
const api = {
	auth: {
		login: {
			email: {
				send_code: {
					method: 'POST' as const,
					path: '/auth/login/email/send-code',
					params: RT<{ email: string }>,
					data: RT<null>,
					error: RT<'429'>,
					success: RT<null>,
				},
				verify: {
					method: 'POST' as const,
					path: '/login/email/verify',
					params: RT<null>,
					data: RT<{
						email: string
						code: string
					}>,
					error: RT<'wrong_code'>,
					success: RT<null>,
				},
			}
		},
		logout: {
			method: 'POST' as const,
			path: '/logout',
			params: RT<null>,
			data: RT<null>,
			error: RT<null>,
			success: RT<null>,
		},
	},
	settings: {
		email: {
			send_code: {
				method: 'POST' as const,
				path: '/settings/email/send-code',
				params: RT<null>,
				data: RT<{ email: string }>,
				error: RT<'429'>,
				success: RT<null>,
			},
			verify: {
				method: 'POST' as const,
				path: '/settings/email/verify',
				params: RT<null>,
				data: RT<{ email: string; code: string }>,
				error: RT<'wrong_code'>,
				success: RT<null>,
			},
		}
	},
}
