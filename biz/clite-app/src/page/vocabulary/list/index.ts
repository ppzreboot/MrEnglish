import { css } from 'goober'
import { $S, h, text } from '@biz/c/superfine'
import { load, page_state } from '../ss.ts'

export
const List = () =>
	$Cont({}, [
		h('ul', {}, [
			...page_state.list.map(item =>
				h('li',
					{
						key: item.record.id,
					},
					text(item.record.word),
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

}))
