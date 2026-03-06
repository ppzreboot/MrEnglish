import type { NextRequest } from 'next/server'

export
function clone_url(request: NextRequest, pathname = '/') {
	let url: URL
	const reverse_proxy_host = request.headers.get('x-forwarded-host')
	if (reverse_proxy_host !== null) {
		const protocal = request.headers.get('X-Forwarded-Proto')
		if (protocal !== 'http' && protocal !== 'https') {
			console.error({ protocal })
			throw Error('weird request header')
		}
		url = new URL(`${protocal}://${reverse_proxy_host}`)
	} else {
		url = request.nextUrl.clone()
	}
	url.pathname = pathname
	return url
}
