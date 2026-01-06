import { I_i } from '@biz/s/schema'
import { parse_cookie } from '../../utils/parse-cookie.ts'

export
function read_session_token(req: Request) {
    const cookie_str = req.headers.get('cookie')
    if (cookie_str === null)
        return null
    const cookie = parse_cookie(cookie_str)
    const token = cookie.session_token
    if (typeof(token) !== 'string' || token.length === 0)
        return null
    return token
}

export
async function throw_login(input: I_i) {
	const session_token = read_session_token(input.request)
	if (session_token !== null) {
		const userid = await input.service.session(session_token)
			.get_current_user_id()
		if (userid !== null)
			return userid
	}

	throw new Response('Redirecting to Login', {
		status: 302,
		headers: {
			'Set-Cookie': 'session_token=; Path=/; Max-Age=0',
			'Location': '/login', // TODO: 应该记录当前请求，登录后自动跳回
		},
	})
}
