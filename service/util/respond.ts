import { NextResponse } from 'next/server'

export
function success_json(data?: unknown) {
	return NextResponse.json({ error: null, data })
}

export
function fail_json(error: string) {
	return NextResponse.json({ error, data: null })
}

export
function error400() {
	return new NextResponse('bad request', { status: 400 })
}

/** 没 toke 或 token 过期 */
export
function error401() {
	return new NextResponse('unauthorized', { status: 401 })
}
