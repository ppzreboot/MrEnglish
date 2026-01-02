import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export
interface I_state<V> {
	val: V
	set: Dispatch<SetStateAction<V>>
}

export
function useStt<State>(init_value: State) {
	const [val, set] = useState(init_value)
	return { val, set }
}
