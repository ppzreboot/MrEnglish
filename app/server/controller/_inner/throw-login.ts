import { I_i } from '@mr-english-server/schema'

export
async function throw_login(input: I_i) {
	const userid = await input.service.session(input.request)
		.get_current_user_id()
	if (userid !== null)
		return userid

	throw new Response('Redirecting to Login', {
		status: 302,
		headers: {
			'Set-Cookie': 'session_token=; Path=/; Max-Age=0',
			'Location': '/login',
		},
	})
}
