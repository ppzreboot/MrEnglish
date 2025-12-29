import type { I_lookup_result } from '@biz/common/entity'
import type { I_lookup_record } from '@biz/common/page'
import type { I_prn_audio__playing, I_prn_audio__stopped } from '@biz/c/ui'


export
interface I_prn {
	ipa: string
	audio?: I_prn_audio__playing<I_state> | I_prn_audio__stopped<I_state>
}

export
type I_state = I_state__empty | I_state__word_not_found | I_state__normal

export
interface I_state__empty {
	type: 'empty'
	current_input: string
	compositing: boolean
}

export
interface I_state__word_not_found {
	type: 'word not found'
	current_input: string
	compositing: boolean

	last_input: string
}

export
interface I_state__normal {
	type: 'normal'
	current_input: string
	compositing: boolean

	last_input: string

	lookup_result: I_lookup_result
	word_record: I_lookup_record
	starring: boolean
	prn_list?: I_prn[]
}
