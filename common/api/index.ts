import { RT, spec } from '#lib/api-spec/client'

export
const api = {
	auth: {
		login: {
			email: {
				send_code: spec({
					method: 'POST',
					path: '/login/email/send-code',
					params: RT<null>,
					data: RT<{ email: string }>,
					error: RT<'429'>,
					success: RT<undefined>,
				}),
				verify: spec({
					method: 'POST',
					path: '/login/email/verify',
					params: RT<null>,
					data: RT<{
						email: string
						code: string
					}>,
					error: RT<'wrong_code'>,
					success: RT<undefined>,
				}),
			}
		},
		logout: spec({
			method: 'POST',
			path: '/logout',
			params: RT<null>,
			data: RT<null>,
			error: RT<never>,
			success: RT<undefined>,
		}),
	},
	settings: {
		email: {
			send_code: spec({
				method: 'POST',
				path: '/settings/email/send',
				params: RT<null>,
				data: RT<{ email: string }>,
				error: RT<'429'>,
				success: RT<undefined>,
			}),
			verify: spec({
				method: 'POST',
				path: '/settings/email/verify',
				params: RT<null>,
				data: RT<{ email: string; code: string }>,
				error: RT<'wrong_code' | 'email_taken'>,
				success: RT<undefined>,
			}),
		}
	},
}
