import { h, app, text, type MaybeVNode, type Action } from 'hyperapp'
import { make_audio_url } from '@ppz/meriam-webster'
import type { I_page_opts__home } from '@biz/common/page'
import type { I_lookup_result } from '@biz/common/entity'
import { Layout, Read_word } from '@biz/c/ui'
import type { I_state, I_state__normal } from './type.ts'

import { Main_input } from './input.ts'
import { $ } from './style.ts'
import { number } from 'npm:zod@^4.1.12'

export
const main = (node: HTMLElement, opts: I_page_opts__home) =>
	app({
		node,
		init: opts2state(opts),
		view: s => Layout<I_state>([
			Main_input(s),
			$.lookup_result({}, [
				s.type === 'normal' &&
					basic_explain(s),

			])
		]),
	})

const basic_explain = (s: I_state__normal): MaybeVNode<I_state> =>
	h<I_state>('article', { class: 'main-content basic' }, [
		h('h5', {}, [text('简明释义')]),
		s.prn_list &&
			h('ul', { class: 'pronuciation-list' },
				s.prn_list.map(prn =>
					h('li', {}, [
						Read_word(prn)
					])
				)
			)
		,
	])
	
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
				prn_list: opts.result.mw?.map(entry => entry.prs)
					.filter(prs => prs !== undefined)
					.map(prs =>
						prs.map(p => {
							const audio_url = p.audio
							return {
								ipa: p.ipa,
								audio: audio_url === undefined ? undefined :
									{
										playing: false,
										on_start: s => {
											const audio = new Audio(audio_url)
											audio.play()
											if (s.type === 'normal')

											return s
										},
									} as { playing: false, on_start: Action<I_state> }
							}
						})
					)
					.flat()
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
