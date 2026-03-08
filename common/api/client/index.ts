import type { I_http_method, I_api_spec, I_api } from '../type'

export
async function _fetch<API extends I_api_spec>(opts: {
	method: API['method']
	path: API['path']
	params: API['input']['params']
	data: API['input']['data']
}) {
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

_fetch<I_api['auth']['login']['email']['send_code']>({
	method: 'POST',
	path: '/login/email/send-code',
	params: { email: 's' },
	data: null,
})
