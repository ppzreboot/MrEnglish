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

/** 应在前端检验格式，如果后端收到异常格式的数据，那么可以认为用户使用了非法的客户端，此时详细的异常信息不应当返回给用户 */
export
function error400() {
	return new NextResponse('bad request', { status: 400 })
}

/** 没 toke 或 token 过期 */
export
function error401() {
	return new NextResponse('unauthorized', { status: 401 })
}
