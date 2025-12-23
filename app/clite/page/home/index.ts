import { h, app, text } from 'hyperapp'
import { star_icon, search_icon } from '@mr-english-client/ui'
import { I_page_opts__home, I_page_opts__ee_entry } from '@mr-english/schema'

import './index.css'

type I_state = {
	type: 'empty'
	current_input: string
	compositing: boolean
} | {
	type: 'word not found'
	last_input: string
	current_input: string
	compositing: boolean
} | {
	type: 'normal'
	last_input: string
	current_input: string
	compositing: boolean
	has_star: boolean
	word_oid: string
	staring: boolean
}

export
const home_page = (opts: I_page_opts__home) => {
	console.log({ opts })
	main_input(opts)
	if (opts.type === 'normal' && opts.ee_entry_list)
		ee_short_def(opts.ee_entry_list)
}

const main_input = (opts: I_page_opts__home) =>
	app<I_state>({
		node: document.querySelector('.main-input') as HTMLDivElement,
		init(): I_state {
			switch (opts.type) {
				case 'empty':
					return { type: 'empty', current_input: '', compositing: false }
				case 'word not found':
					return {
						type: 'word not found',
						last_input: opts.word,
						current_input: opts.word,
						compositing: false,
					}
				case 'normal':
					return {
						type: 'normal',
						last_input: opts.word,
						current_input: opts.word,
						compositing: false,
						has_star: opts.record.star,
						word_oid: opts.record.id,
						staring: false,
					}
			}
		},
		view: state =>
			h('div', {}, [
				h('input', {
					class: 'en-font',
					value: state.current_input,
					autofocus: state.type === 'empty',
					placeholder: '输入单词',
					oncompositionstart: s => ({
						...s,
						compositing: true,
					}),
					oncompositionend: s => ({
						...s,
						compositing: false,
					}),
					oninput: (s, evt) => ({
						...s,
						current_input: (evt.target as HTMLInputElement).value,
					}),
					onkeydown: (s, evt) => {
						if (s.compositing)
							return s
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

const ee_short_def = (list: I_page_opts__ee_entry[]) =>
	app({
		node: document.querySelector('.entries')!,
		init: {},
		view: () =>
			h('div', {},
				list.map(entry =>
					h('div', { class: 'entry' }, [
						h('h5', { class: 'fl' },
							text(entry.fl)
						),
						h('ul', { class: 'list' },
							entry.shortdef.map(def =>
								h('li', { class: 'txt-item' },
									text(def)
								)
							)
						)
					])
				)
			)
	})

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
							compositing: false,
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
