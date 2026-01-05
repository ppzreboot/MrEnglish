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
