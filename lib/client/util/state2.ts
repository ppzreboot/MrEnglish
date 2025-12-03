import { useState } from 'react'
import { produce, type Draft } from 'immer'

type I_alter<I_state> = (draft: Draft<I_state>) => void
type I_update<I_state> = (alter: I_alter<I_state>) => void

export
function useState2<S>(s: S): [S, I_update<S>] {
	const [state, set_state] = useState<S>(s)
	return [
		state,
		alter =>
			set_state(old_state =>
				produce(old_state, _draft => alter(_draft))
			)
		,
	]
}