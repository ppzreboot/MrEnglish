export
interface I_handler_input<I_app_service> {
    request: Request
    service: I_app_service
    url: URL
}

export
type I_handler<I_app_service> = (input: I_handler_input<I_app_service>) =>
    Response | Promise<Response>

export
type I_HTTP_method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'

export
type I_route<I_app_service> = (method: I_HTTP_method, url: URL) =>
    null | I_handler<I_app_service>
