import { css } from 'goober'
import { $S, redraw, h } from '@biz/c/superfine'
import { cns } from '@biz/common/util'
import { SVG__star, SVG__search } from '@biz/c/ui2'
import { home_page_url } from '@biz/common/page'
import { is_valid_en_phrase } from '@biz/common/util'

import { I_state } from './ss.ts'

export
const Main_input = (state: I_state) => {
	const disabled_lookup
		= state.current_input.length === 0
		|| !is_valid_en_phrase(state.current_input)

	return $Main_input({ className: 'main-content' }, [
		h('input',
			{
				placeholder: '输入单词',
				className: 'en-font',
				autofocus: state.type === 'empty',
				value: state.current_input,
				onfocus: (evt: FocusEvent) => {
					if (state.current_input.length > 0)
						(evt.target as HTMLInputElement).select()
				},
				oninput: (evt: InputEvent) => {
					state.current_input = (evt.target as HTMLInputElement).value
					redraw()
				},
				oncompositionstart: () => {
					state.compositing = true
					redraw()
				},
				oncompositionend: () => {
					state.compositing = false
					redraw()
				},
				onkeydown: (evt: KeyboardEvent) => {
					if (!state.compositing && evt.key === 'Enter')
						location.href = home_page_url(state.current_input)
				},
			}
		),

		state.type === 'normal' && state.current_input === state.last_input
			? h('button',
					{
						className: cns(
							'icon-btn',
							state.word_record.star &&
								css({
									color: 'var(--star-color)',
								})
						),
						disabled: disabled_lookup,
						onclick: async () => {
							// “请求期间” 为避免其他操作引起的复杂 state 变化，应把大部分都 disable
							// 因为在普通情况下，网速不慢，用户等待时间很短
							state.starring = true
							await fetch(`/api/star?word=${
								state.word_record.id}&star=${state.word_record.star ? 0 : 1}`)
							state.word_record.star = !state.word_record.star
							state.starring = false
							redraw()
						},
					},
					SVG__star(state.word_record.star),
				)
			: h('a',
					{
						className: cns('icon-btn', disabled_lookup && 'disabled'),
						href: disabled_lookup
							? null
							: home_page_url(state.current_input)
						,
					},
					SVG__search(),
				)
	])
}


const $Main_input = $S('div', css({
	display: 'flex',
	alignItems: 'center',
	gap: 'var(--fs)',

	input: {
		flex: 1,
		'@media (min-width: 600px)': {
			textAlign: 'center',
			fontSize: 'calc(var(--fs) * 2)',
			height: 'calc(var(--fs) * 3)',
		},
		'@media (max-width: 600px)': {
			height: 'calc(var(--fs-lg) * 1.5)',
		},
	},

	'.icon-btn': {
		fontSize: '1.5rem',
		'@media (max-width: 600px)': {
			fontSize: '1rem',
		},
	},
}))
