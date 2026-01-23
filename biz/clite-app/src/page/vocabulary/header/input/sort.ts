import { css } from 'goober'
import { assert, cns } from '@biz/common/util'
import type { voc_api as api } from '@biz/common/api'
import { $S, redraw, h, text } from '@biz/c/superfine'
import { SVG__thin_arrow } from '@biz/c/ui2'
import { select_style } from '@biz/c/style'
import { page_state, load } from '../../ss.ts'

const opt_list: api.I_sort[] = [
	{ key: 'time', order: 'desc' },
	{ key: 'time', order: 'asc' },
	{ key: 'alphabet', order: 'asc' },
	{ key: 'alphabet', order: 'desc' },
]

export
const Sort_input = () => {
	const sort = page_state.opts.sort
	return $Cont({}, [
		h('div', { className: 'display' },
			Sort_label(sort, false, false),
		),
		h('div', { className: 'dropdown' },
			h('ul', {},
				opt_list.map(opt =>
					h('li', { key: opt.key + ' ' + opt.order },
						Sort_label(opt, equal_sort(opt, sort), true),
					)
				)
			)
		)
	])
}

const equal_sort = (a: api.I_sort, b: api.I_sort) =>
	a.key === b.key && a.order === b.order

const $Cont = $S('div', cns(select_style.container, css({
	button: {
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

const Sort_label = (sort: api.I_sort, selected: boolean, clickable: boolean) =>
	h('button',
		{
			disabled: selected || page_state.loading,
			onclick: clickable
				? async () => {
					assert(
						equal_sort(sort, page_state.opts.sort) === false,
						'clicked a disabled button'
					)
					page_state.opts.sort.key = sort.key
					page_state.opts.sort.order = sort.order
					redraw()
					await load(false)
				}
				: undefined
		},
		[
			text({
				time: '最近查询',
				alphabet: '字母表',
			}[sort.key]),
			SVG__thin_arrow(sort.order === 'asc' ? undefined : { style: 'transform: rotate(180deg);' }),
		],
	)
