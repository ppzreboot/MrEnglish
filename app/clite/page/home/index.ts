import { h, app } from 'hyperapp'
import { star_icon, search_icon } from '@mr-english-client/ui'
import './index.css'
import { I_init_data } from './type.ts'

type I_state = {
	type: 'empty'
	current_input: string
} | {
	type: 'word not found'
	last_input: string
	current_input: string
} | {
	type: 'normal'
	last_input: string
	current_input: string
	has_star: boolean
	word_oid: string
	staring: boolean
}

export
const home_page = (opts: I_init_data) => {
	console.log({ opts })

	app<I_state>({
		node: document.querySelector('.main-input') as HTMLDivElement,
		init(): I_state {
			if (opts === null)
				return { type: 'empty', current_input: '' }
			else if (opts.valid_ecdict)
				return {
					type: 'normal',
					current_input: opts.word,
					last_input: opts.word,
					has_star: opts.record.star,
					word_oid: opts.record.id,
					staring: false,
				}
			else
				return {
					type: 'word not found',
					current_input: opts.word,
					last_input: opts.word,
				}
		},
		view: state =>
			h('div', {}, [
				h('input', {
					class: 'en-font',
					value: state.current_input,
					autofocus: state.type === 'empty',
					placeholder: '输入单词',
					oninput: (s, evt) => ({
						...s,
						current_input: (evt.target as HTMLInputElement).value,
					}),
					onkeydown: (s, evt) => {
						const q = s.current_input.trim()
						if (evt.key === 'Enter' && q.length)
							location.href = '/?q=' + q
						return s
					},
				}),
				right_btn(state),
			])
		,
	})
}

const right_btn = (state: I_state) =>
	state.type === 'normal' && state.current_input === state.last_input
	? h<I_state>('button',
			{
				class: 'icon-btn',
				disabled: state.staring,
				style: state.has_star
					? { color: '#eac54f' }
					: undefined,
				onclick: s => [
					{ ...s, staring: true },
					async dispatch => {
						await fetch(`/api/star?word=${state.word_oid}&star=${state.has_star ? '0': '1'}`)
						// TODO: 未检查结果
						dispatch({
							type: 'normal',
							current_input: state.current_input,
							last_input: state.last_input,
							word_oid: state.word_oid,
							has_star: !state.has_star,
							staring: false,
						})
					},
				],
			},
			[
				star_icon(state.has_star)
			],
		)
	: h<I_state>('a',
			{
				class: {
					'icon-btn': true,
					disabled: state.current_input.trim().length === 0
				},
				href: '/?q=' + state.current_input,
				onclick(s, e) {
					if (state.current_input.trim().length === 0)
						e.preventDefault()
					return s
				},
			},
			[search_icon()]
		)
