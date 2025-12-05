export
const SUCCESS = Symbol('good request')

export
async function throw_bad_request(handler_name: string, cb: () => Awaited<typeof SUCCESS | unknown>) {
	const error = await cb()
	if (error === SUCCESS) return

	console.error('bad request in ' + handler_name)
	console.error(error)
	throw Response.json({
			error: true,
			key: 'bad request',
	})
}
