import { css } from 'goober'
import { $S, h, text } from '@biz/c/superfine'
import { load, page_state } from '../ss.ts'
import { home_page_url } from '@biz/common/page'

export
const List = () =>
	$Cont({}, [
		h('ul', {}, [
			...page_state.list.map(item =>
				h('li',
					{
						className: 'voc-item',
						key: item.record.id,
					},
					h('a',
						{
							href: home_page_url(item.record.word),
							className: 'reset',
						},
						text(item.record.word),
					),
				)
			),
			h('li', { className: 'load-more' },
				h('button',
					{
						disabled: page_state.loading,
						async onclick() {
							await load(true)
						},
					},
					text('加载更多'),
				)
			)
		])
	])

const $Cont = $S('div', css({
	padding: '1.2em 0',
	ul: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		rowGap: '.6em',
		columnGap: '1em',
		li: {
			backgroundColor: 'var(--content-bg-color)',
			padding: '0 1.2em',
			height: '2.6em',
			borderRadius: '1.3em',
			display: 'flex',
			alignItems: 'center',
			'&.voc-item': {
				a: {
					color: 'inherit',
					textDecoration: 'none',
				},
			},
		},
	},
}))
