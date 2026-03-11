import { I_api_spec, I_api_input, I_api_output } from '#lib/api-spec/_common'

export * from './_common'

/** 定义单条 API spec，做编译期校验 */
export
function spec<
	P extends null | Record<string, string>,
	D,
	E extends string & (string extends E ? never : unknown),
	S extends Exclude<unknown, null>,
>(
	s: I_api_spec<P, D, E, S>,
): I_api_spec<P, D, E, S> {
	return s
}

export
async function call_api<
	P extends null | Record<string, string>,
	D,
	E extends string & (string extends E ? never : unknown),
	S extends Exclude<unknown, null>,
>(
	spec: I_api_spec<P, D, E, S>,
	input: I_api_input<P, D>,
) {
	// make path
	let path = spec.path
	if (input.params !== null)
		path += '?' + new URLSearchParams(input.params).toString()
	// make body
	let body
	if (input.data !== null)
		body = JSON.stringify(input.data)

	// GO
	const res = await fetch(path, {
		method: spec.method,
		body,
		// credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		}
	})

	// bad client or network
	if (!res.ok)
		throw new Error(`HTTP ${res.status}`)

	return await res.json() as Promise<I_api_output<E, S>>
}
