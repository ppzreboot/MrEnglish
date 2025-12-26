import { h } from 'hyperapp'
import type { I_state } from './type.ts'
import { star_icon, search_icon } from '@biz/c/ui'
import { home_page_url } from '@biz/common/page'
import { $ } from './style.ts'

export
const Main_input = (s: I_state) =>
	$.main_input({}, [
		$.input({
			value: s.current_input,
			placeholder: '输入单词',
			autofocus: s.type === 'empty',
			oninput: (_, evt) => ({
				...s,
				current_input: (evt.target as HTMLInputElement).value,
			}),
			oncompositionstart: () => ({
				...s,
				compositing: true,
			}),
			oncompositionend: () => ({
				...s,
				compositing: false,
			}),
			onkeydown: (_, evt) => {
				if (s.compositing)
					return s
				const q = s.current_input.trim()
				if (evt.key === 'Enter' && q.length)
					location.href = home_page_url(q)
				return s
			},
		}),
		Right_btn(s),
	])

const Right_btn = (s: I_state) => {
	const trimed_word = s.current_input.trim()
	return s.type === 'normal' && trimed_word === s.last_input
		? $.button<I_state>({
				disabled: s.starring,
				style: s.word_record.star
					? { color: '#eac54f' }
					: undefined
				,
				onclick: () => [
					{
						...s,
						starring: true,
					},
					async dispatch => {
						const current_star = s.word_record.star
						await fetch(`/api/word?word=${
							s.word_record.id}&star=${current_star ? 0 : 1}`)
						dispatch({
							...s,
							starring: false,
							word_record: {
								id: s.word_record.id,
								star: !current_star,
							}
						})
					},
				],
			},
			[
				star_icon(s.word_record.star)
			])
		: h<I_state>('a',
			{
				class: {
					'icon-btn': true,
					disabled: trimed_word.length === 0
				},
				href: home_page_url(trimed_word),
				onclick(s, e) {
					if (trimed_word.length === 0)
						e.preventDefault()
					return s
				},
			},
			[search_icon()]
		)
}
