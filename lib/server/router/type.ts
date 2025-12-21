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
