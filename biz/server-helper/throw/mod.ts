import type z from 'zod'

type I_format<T> = () => [false, unknown] | [true, T]

export
function format_request_query<T>(handler_name: string, cb: I_format<T>): T {
	const [ok, input_or_err] = cb()
	if (ok) return input_or_err
	
	console.error('bad request query in ' + handler_name)
	console.error(input_or_err)
	throw Response.json({
			error: true,
			key: 'bad request',
	})
}

export
async function format_request_body<T>(handler_name: string, req: Request, ztype: z.ZodType<T>) {
	try {
		const data = await req.json()
		return ztype.parse(data)
	} catch(err) {
		console.error('bad request body in', handler_name)
		console.error(err)
		throw Response.json({
			error: true,
			key: 'bad request',
		})
	}
}
