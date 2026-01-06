import { css } from 'goober'
import { cns } from '@biz/common/util'
import { $S, redraw, h, text } from '@biz/c/superfine'
import { I_voc__sort } from '@biz/common/api'
import { SVG__thin_arrow } from '@biz/c/ui2'
import { select_style } from '@biz/c/style'

const opt_list: I_voc__sort[] = [
	{ key: 'time', order: 'up' },
	{ key: 'time', order: 'down' },
	{ key: 'alphabet', order: 'up' },
	{ key: 'alphabet', order: 'down' },
]

export
function Sort_input(sort: I_voc__sort) {
	return $Cont({}, [
		h('div',
			{
				className: 'display',
				tabindex: 0,
			},
			Sort_label(sort)
		),
		h('div', { className: 'dropdown' },
			h('ul', {},
				opt_list.map(opt =>
					h('li',
						{
							className: cns(equal_sort(opt, sort) && 'active'),
							key: opt.key,
							onclick: () => {
								if (equal_sort(opt, sort)) return
								sort.key = opt.key
								sort.order = opt.order
								redraw()
							}
						},
						Sort_label(opt),
					)
				)
			)
		)
	])
}

const equal_sort = (a: I_voc__sort, b: I_voc__sort) =>
	a.key === b.key && a.order === b.order

const $Cont = $S('div', cns(select_style.container, css({
	label: {
		width: '6.3em',
		gap: '0.2em',
		svg: {
			width: '.8em',
			marginRight: '-0.3em',
		},
	},
	'.dropdown': {
		left: 0,
		top: '100%',
	},
})))


const Sort_label = (sort: I_voc__sort) =>
	h('label', {}, [
		text({
			time: '最近查询',
			alphabet: '字母表',
		}[sort.key]),
		SVG__thin_arrow(sort.order === 'up' ? undefined : { style: 'transform: rotate(180deg);' }),
	])
