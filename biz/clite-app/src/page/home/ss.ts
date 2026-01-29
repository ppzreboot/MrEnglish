import type { I_page_opts__home, I_lookup_record } from '@biz/common/page'
import type { I_lookup_result } from '@biz/common/entity'

export
const init_state = (opts: I_page_opts__home): I_state =>
	((): I_state => {
		// ! 这种形式能检查 “所有 case” 都有返回值
		switch (opts.type) {
			case 'empty':
				return {
					type: 'empty',
					current_input: '',
					compositing: false,
				}
			case 'not found':
				return {
					type: 'not found',
					current_input: opts.word,
					compositing: false,
					last_input: opts.word,
				}
			case 'normal':
				return {
					type: 'normal',
					current_input: opts.word,
					compositing: false,
					last_input: opts.word,
					word_record: opts.record,
					starring: false,
					lookup_result: opts.result,
				}
		}
	})()

export
type I_state = {
	type: 'empty'
	current_input: string
	compositing: boolean
} | {
	type: 'not found'
	current_input: string
	compositing: boolean

	last_input: string
} | {
	type: 'normal'
	current_input: string
	compositing: boolean

	last_input: string

	word_record: I_lookup_record
	starring: boolean

	lookup_result: I_lookup_result
}
