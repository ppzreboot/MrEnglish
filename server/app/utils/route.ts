import { I_http_handler, I_HTTP_method, I_route } from '../type.ts'

export
const match_route = (target_method: I_HTTP_method, path: string, handler: I_http_handler): I_route =>
    (current_method, url) =>
        target_method === current_method && url.pathname === path
            ? handler
            : null
