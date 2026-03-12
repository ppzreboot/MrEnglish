export
type I_api_output
	= { ok: true, data: any }
	| { ok: false, error: string }

export
async function call_api(
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	path: string,
	input?: {
		type: 'query' | 'body'
		data: any,
	}
): Promise<I_api_output> {
	let body
	switch (input?.type) {
		case 'query':
			path += '?' + new URLSearchParams(input.data)
			break
		case 'body':
			body = JSON.stringify(input.data)
			break
	}

	// GO
	const res = await fetch(path, {
		method,
		body,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		}
	})

	// bad client or network
	if (!res.ok)
		throw res

	return await res.json()
}
