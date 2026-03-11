import { NextResponse } from 'next/server'

export
function success_json(data?: unknown) {
	return NextResponse.json({ error: null, data })
}
export
function success<D>(data: D) {
	return { error: null, data}
}

export
function empty_success() {
	return { error: null, data: undefined }
}

export
function fail<E>(error: E) {
	return { error, data: null }
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
