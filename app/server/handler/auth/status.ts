import { I_handler, I_route } from '@mr-english-server/router'
import { I_app_service } from '@mr-english-server/schema'

export
const route__auth_status: I_route<I_app_service> = (method, url) =>
    (method === 'GET' && url.pathname === '/api/auth/status')
        ? auth_status
        : null

const auth_status: I_handler<I_app_service> = async ctx => {
    const user_id = await ctx.service.session(ctx.request).get_current_user_id()
    const signed_in = user_id !== null
    return Response.json({
        error: false,
        data: {
            signed_in,
            github_oauth_client_id: signed_in
                ? undefined
                : ctx.service.env.github_oauth_client_id,
        },
    })
}
