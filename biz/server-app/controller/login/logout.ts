import { I_c } from '@biz/s/schema'
import { read_session_token } from '../_inner/throw-login.ts'

export
const logout_controller: I_c = async ctx => {
	const session_token = read_session_token(ctx.request)
	if (session_token === null)
		throw Response.json({
				error: true,
				key: 'bad request',
		})
	await ctx.service.auth.signout(session_token)
	return new Response('Goodbye!', {
		headers: {
			'Set-Cookie': 'session_token=; Path=/; Max-Age=0',
		}
	})
}
