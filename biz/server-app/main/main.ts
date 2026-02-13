import { serve_clite } from '@ppz/clite/server'
import { I_HTTP_method, make_router, I_route } from '@biz/s/router'
import { I_app_service } from '@biz/s/schema'
import clite_meta from '../.clite/.meta.ts'
import { read_env } from './env.ts'
import { init } from './init.ts'

console.log('\n\nStarting MrEnglish', new Date())

const app_env = read_env()
const { service, route_list } = await init(app_env)
log_route(route_list)
const router = make_router(route_list)
let request_index = 0

Deno.serve(
    {
        port: app_env.port,
        onListen() {
            console.log('MrEnglish is listening on ' + app_env.port)
            console.log() // empty line
        }
    },
    async request => {
        const url = new URL(request.url)
        console.log(`${request.method} ${url.pathname} (${request_index++})`)

        if (url.pathname.startsWith(clite_meta.url_prefix)
            && get_or_head(request.method)
        )
            return await serve_clite(
                clite_meta,
                url.pathname,
                request.method === 'HEAD',
            )

        const controller = router(request.method as I_HTTP_method, url.pathname)
        if (controller === undefined) {
            console.error(`Not Found: ${request.method} ${request.url}`)
            return Response.json({
                error: true,
                key: 'Not Found',
            })
        }

        const started = Date.now()
        try {
            return await controller({ request, service, url })
        } catch(err) {
            if (err instanceof Response)
                return err
            console.error(err)
            return Response.json({
                error: true,
                key: 'Unknown Error',
            })
        } finally {
            console.log(`request ${request_index} done in ${Date.now() - started}ms`)
        }
    },
)

function log_route(list: I_route<I_app_service>[]) {
    console.log('app route:\n' +
        list
            .map(r => r[0] + '\t' + r[1])
            .join('\n')
    )
}

const get_or_head = (m: string) => m === 'GET' || m === 'HEAD'
