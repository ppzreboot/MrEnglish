import type { I_handler, I_HTTP_method, I_route } from './type.ts'

export
function simple_match<I_app_service>(opts: {
    method: I_HTTP_method
    path: string
    handler: I_handler<I_app_service>
}): I_route<I_app_service> {
    return (method, url) =>
        method === opts.method && url.pathname === opts.path
            ? opts.handler
            : null
}
