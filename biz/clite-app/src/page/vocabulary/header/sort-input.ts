import { css } from 'goober'
import { $S, redraw, h, text } from '@biz/c/superfine'
import { I_voc__sort } from '@biz/common/api'
import { SVG__thin_arrow } from '@biz/c/ui2'
import { cns } from '@biz/common/util'

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

const $Cont = $S('div', css({
	position: 'relative',
	'.display': {
		background: 'var(--content-bg-color)',
		border: '1px solid rgba(var(--font-color), .08)',
		borderRadius: '.25em',

		display: 'grid',
		placeItems: 'center',
	},
	'&:hover .dropdown, .display:focus + .dropdown': {
		display: 'block',
	},
	'.dropdown': {
		display: 'none',
		paddingTop: '.3em',
		position: 'absolute',
		left: 0,
		top: '100%',
		ul: {
			background: 'var(--content-bg-color)',
			border: '1px solid rgba(var(--font-color), .08)',
			borderRadius: '.25em',

			padding: '.2em 0',

			'li:not(.active)': {
				color: 'var(--link-color)',
				cursor: 'default',
				opacity: .8,
				'&:hover': {
					opacity: 1,
				},
			},
		},
	},
}))

const $Sort_label = $S('label', css({
	height: '2em',
	width: '6.3em',

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	gap: '0.2em',
	cursor: 'pointer',
	svg: {
		width: '.8em',
		marginRight: '-0.3em',
	},
}))

const Sort_label = (sort: I_voc__sort) =>
	$Sort_label({}, [
		text({
			time: '最近查询',
			alphabet: '字母表',
		}[sort.key]),
		SVG__thin_arrow(sort.order === 'up' ? undefined : { style: 'transform: rotate(180deg);' }),
	])
