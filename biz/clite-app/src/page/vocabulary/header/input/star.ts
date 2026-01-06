import { css } from 'goober'
import { cns } from '@biz/common/util'
import { SVG__star } from '@biz/c/ui2'
import { $S, h, I_value, redraw, text } from '@biz/c/superfine'
import { select_style } from '@biz/c/style'

export
function Star_input(star: I_value<boolean | undefined>) {
	return $Cont({}, [
		h('div', { className: 'display' },
			star.val === undefined
				? h('label', {}, [
					h('span', { style: 'opacity: .7' }, text('收藏')),
					SVG__star(false, { style: 'color: var(--star-color); opacity: .8;' }),
				])
				: Label(star.val)
		),
		h('div', { className: 'dropdown' },
			h('ul', {}, [
				Option(undefined, star),
				Option(true, star),
				Option(false, star),
			])
		)
	])
}

const $Cont = $S('div', cns(select_style.container, css({
	label: {
		width: '6em',
		gap: '.4em',
		svg: {
			width: '1em',
		}
	},
})))

const Label = (star?: boolean) =>
	h('label', {},
		star === true ? [text('已收藏'), SVG__star(true, { style: 'color: var(--star-color)' })]
		: star === false ? [text('未收藏'), SVG__star(false)]
		: [text('全部'), SVG__star(false, { style: 'color: var(--star-color);' })]
	)

const Option = (self: boolean | undefined, state: I_value<boolean | undefined>) =>
	h('li',
		{
			className: cns(self === state.val && 'active'),
			onclick: () => {
				state.set(self)
				redraw()
			}
		},
		Label(self),
	)
