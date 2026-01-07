import { css } from 'goober'
import { voc_api as api } from '@biz/common/api'
import { $S, h, text } from '@biz/c/superfine'

export
type I_item = {
	record: api.I_record
	selected: boolean
}

export
const make_List = ({ load_more, ...state }: {
	list: I_item[]
	multi_select: boolean
	load_more: () => Promise<void>
}) =>
	(multi_select: boolean) => {
		state.multi_select = multi_select
		return $Cont({}, [
			h('ul', {}, [
				...state.list.map(item =>
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
							onclick: load_more,
						},
						text('加载更多'),
					)
				)
			])
		])
	}

const $Cont = $S('div', css({

}))
