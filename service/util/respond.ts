import { NextResponse } from 'next/server'

export
function success_json(data?: unknown) {
	return NextResponse.json(success(data))
}
export
function success<D>(data: D) {
	return { ok: true as const, data}
}

export
function empty_success() {
	return success(undefined)
}

export
function fail<E>(error: E) {
	return { ok: false as const, error }
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
