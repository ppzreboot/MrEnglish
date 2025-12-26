import type { I_lookup_result } from '@biz/common/entity'
import type { I_lookup_record } from '@biz/common/page'

export
type I_state = {
	type: 'empty'
	current_input: string
	compositing: boolean
} | {
	type: 'word not found'
	current_input: string
	compositing: boolean

	last_input: string
} | {
	type: 'normal'
	current_input: string
	compositing: boolean

	last_input: string

	lookup_result: I_lookup_result
	word_record: I_lookup_record
	starring: boolean
}
