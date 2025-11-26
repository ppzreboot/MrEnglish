import { I_handler, I_HTTP_method, I_handler_input } from '@mr-english-server/router'
import { I_app_service } from '@mr-english-server/schema'
import { read_env } from './env.ts'
import { init } from './init.ts'

const app_env = read_env()
const { service, route_list } = init(app_env)

Deno.serve(
    {
        port: app_env.port,
        onListen: () => {
            console.log('HTTP Server is listening on ' + app_env.port)
        },
    },
    request => {
        const url = new URL(request.url)
        for (const route of route_list) {
            const handler = route(request.method as I_HTTP_method, url)
            if (handler !== null) {
                return _handle({ request, service, url }, handler)
            }
        }
        console.error(`Not Found: ${request.method} ${request.url}`)
        return Response.json({
            error: true,
            key: 'Not Found',
        })
    },
)

async function _handle(
    input: I_handler_input<I_app_service>,
    handler: I_handler<I_app_service>,
): Promise<Response> {
    try {
        return await handler(input)
    } catch(err) {
        if (err instanceof Response)
            return err
        console.error(err)
        return Response.json({
            error: true,
            key: 'Unknown Error',
        })
    }
}
