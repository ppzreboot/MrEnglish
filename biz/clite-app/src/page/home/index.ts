import { h, app, text } from 'hyperapp'
import type { I_page_opts__home } from '@biz/common/page'
import { Layout } from '@biz/c/ui'
import type { I_state } from './type.ts'

import { Main_input } from './input.ts'

export
const main = (node: HTMLElement, opts: I_page_opts__home) =>
	app({
		node,
		init: opts2state(opts),
		view: s => Layout<I_state>([
			Main_input(s)
		]),
	})

const opts2state = (opts: I_page_opts__home): I_state => {
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
				word_record: opts.record,
				lookup_result: opts.result,
				starring: false,
			}
	}
}

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


