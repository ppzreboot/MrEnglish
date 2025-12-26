type I_format<T> = () => [false, unknown] | [true, T]

export
function format_request_input<T>(handler_name: string, cb: I_format<T>): T {
	const [ok, input_or_err] = cb()
	if (ok) return input_or_err
	
	console.error('bad request in ' + handler_name)
	console.error(input_or_err)
	throw Response.json({
			error: true,
			key: 'bad request',
	})
}

export
async function format_request_body<T>() {

}
