export
interface I_HTTP_input<I_app_service> {
    request: Request
    service: I_app_service
    url: URL
}

export
type I_controller<I_app_service> = (input: I_HTTP_input<I_app_service>) =>
    Response | Promise<Response>

export
type I_HTTP_method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD'

export
type I_route<I_app_service> =
    [ I_HTTP_method
    , string
    , I_controller<I_app_service>
    ]

export
const make_router = <I_app_service>(route_list: I_route<I_app_service>[]) =>
	(method: I_HTTP_method, path: string) =>
		route_list
			.find(r => r[0] === method && r[1] === path)
			?.[2]
