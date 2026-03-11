export
function runtime_type<T>(t: T) { return t }

export {
	/** Runtime Type */
	runtime_type as RT
}

export
type I_runtime_type<T> = typeof runtime_type<T>

export
interface I_api_input<P extends null | Record<string, string>, D> {
	params: P
	data: D
}

export
type I_api_output<
	E extends string,
	S extends Exclude<unknown, null>,
> =
	| { ok: false, error: E }
	| { ok: true, data: S }

export
type I_http_method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export
interface I_api_spec<
	P extends null | Record<string, string>,
	D,
	E extends string & (string extends E ? never : unknown), // string & unknown === string
	S extends Exclude<unknown, null>,
> {
	method: I_http_method
	path: string
	params: I_runtime_type<P>
	data: I_runtime_type<D>
	error: I_runtime_type<E>
	success: I_runtime_type<S>
}
