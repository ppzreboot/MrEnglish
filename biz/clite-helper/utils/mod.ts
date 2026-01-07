import { useState } from 'react'

export
interface I_stt<V> {
	val: V
	set: (old_val: V) => void
}

export
function useStt<State>(init_value: State) {
	const [val, set] = useState(init_value)
	return { val, set }
}

export
interface I_accessor<S> {
	get: () => S
	set: (v: S) => void
}

export
function make_accessor<S>(value: S): I_accessor<S> {
	return {
		get: () => value,
		set: (v: S) => value = v,
	}
}
