interface I_fetch_opts {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE'
	body?: object
}

export
async function ffetch<Data = undefined>(url: string, opts?: I_fetch_opts) {
	let body
	if (opts?.body)
		body = JSON.stringify(opts.body)
	const res = await fetch(url, {
		method: opts?.method || 'GET',
		body,
		headers: {
			'Content-Type': 'application/json',
		}
	})
	if (!res.ok)
		throw new Error(`HTTP ${res.status}`)
	return await res.json() as {
		error: string
	} | {
		error: null
		data: Data
	}
}
