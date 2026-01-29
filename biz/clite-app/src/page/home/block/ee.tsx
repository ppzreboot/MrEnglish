import { css } from 'goober'
import type { I_formatted_meriam_webster_entry } from '@ppz/meriam-webster'
import { $S, h, text } from '@biz/c/superfine'
// import { En_p } from '@biz/c/ui'

export
const EE_explain = (list: I_formatted_meriam_webster_entry[]) =>
	$EE_details({ className: 'main-content' }, [
		h('h5', {}, text('英英释义')),
		h('div', {},
			list
				.filter(entry => entry.shortdef.length > 0)
				.map(entry =>
					h('div', { className: 'entry' }, [
						h('h5', { className: 'fl' },
							text(entry.fl)
						),
						h('ul', { className: 'txt-list' },
							entry.shortdef.map(def =>
								h('li', {},
									h('div', { title: def },
										text(def)
									)
								)
							)
						)
					])
				)
		)
	])

const $EE_details = $S('article', css({
	'.entry': {
		'&:not(:last-child)': {
			marginBottom: 'var(--fs)',
		},
		'h5.fl': {
			opacity: .8,
			marginBottom: 'calc(var(--fs) / 2)',
			lineHeight: 1.2,
			fontFamily: 'serif, Times New Roman',
		}
	}
}))
