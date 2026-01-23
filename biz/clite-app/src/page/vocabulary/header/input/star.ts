import { css } from 'goober'
import { cns } from '@biz/common/util'
import { SVG__star } from '@biz/c/ui2'
import { $S, h, redraw, text } from '@biz/c/superfine'
import { select_style } from '@biz/c/style'
import { page_state, load } from '../../ss.ts'

export
const Star_input = () => {
	const current_star = page_state.opts.star
	return $Cont({}, [
		h('div', { className: 'display' },
			current_star === undefined
				? h('button',
					{
						disabled: page_state.loading,
					},
					[
						h('span', {}, text('收藏')),
						SVG__star(false, { style: 'color: var(--star-color); opacity: .8;' }),
					],
				)
				: Label(current_star, page_state.loading, false)
		),
		h('div', { className: 'dropdown' },
			h('ul', {},
				[undefined, true, false].map(self =>
					h('li', { key: String(self) },
						Label(
							self,
							self === current_star || page_state.loading,
							true,
						),
					)
				)
			)
		)
	])
}

const $Cont = $S('div', cns(select_style.container, css({
	button: {
		width: '6em',
		gap: '.4em',
		svg: {
			width: '1em',
		}
	},
})))

const Label = (star: boolean | undefined, disabled: boolean, clickable: boolean) =>
	h('button',
		{
			disabled,
			onclick: clickable
				? async () => {
					page_state.opts.star = star
					redraw()
					await load(false)
				}
				: undefined
		},
		star === true ? [text('已收藏'), SVG__star(true, { style: 'color: var(--star-color)' })]
		: star === false ? [text('未收藏'), SVG__star(false)]
		: [text('全部'), SVG__star(false, { style: 'color: var(--star-color);' })]
	)
