import { is_real_string } from '@mr-english/util'
import type { I_c } from '@mr-english-server/schema'
import { get_userinfo_by_code } from '@ppz/oauth-login/github'

export
const github_login_controller: I_c = async ctx => {
    const auth_code = ctx.url.searchParams.get('code')
    if (!is_real_string(auth_code))
        return Response.json({
            error: true,
            key: 'no code'
        })
    
    const [oauth_error, userinfo] = await get_userinfo_by_code(
        auth_code,
        ctx.service.env.github_oauth_client_id,
        ctx.service.env.github_oauth_client_secret,
    )
    if (oauth_error !== 0) {
        const err_key = 'failed to get oauth_id'
        console.error(err_key, oauth_error)
        return Response.json({
            error: true,
            key: err_key,
        })
    }

    const session_token = await ctx.service.sign_up_in('github', userinfo.id)
    const cookie_str = `session_token=${session_token
        }; Max-Age=${ctx.service.env.session_duration_ms / 1000
        }; HttpOnly; Path=/; ${
            ctx.service.env.app_mode === 'production' ? 'Secure;' : ''}`
    return new Response(null, {
        status: 302,
        headers: {
            Location: '/', // TODO: 此处跳转到专门的“跳转界面”
            'Set-Cookie': cookie_str,
        },
    })
}
