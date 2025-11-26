import { I_handler, I_route } from '@ppz-http/router'
import { get_github_login_url } from '@ppz/oauth-login/github'
import { I_app_service } from '@mr-english/app-model'

export
const route__auth_status: I_route<I_app_service> = (method, url) =>
    (method === 'GET' && url.pathname === '/api/auth/status')
        ? auth_status
        : null

const auth_status: I_handler<I_app_service> = async ctx => {
    const user_id = await ctx.service.session(ctx.request).get_current_user_id()
    const signed_in = typeof(user_id) !== 'string'
    const oauth_list = signed_in
        ? null
        : [
            { key: 'github', link: get_github_login_url(ctx.service.env.github_oauth_client_id) },
        ]
    return Response.json({
        error: false,
        data: {
            signed_in,
            oauth_list,
        },
    })
}
