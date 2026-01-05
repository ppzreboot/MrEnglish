import { text } from 'superfine'
import { css } from 'goober'
import { $S } from '@biz/c/superfine'
import type {
	I_voc__sort,
	I_voc__list_opts,
} from '@biz/common/api'
import { Select } from './select.ts'

export
interface I_header_opts {
	query_opts: I_voc__list_opts
	multi_select: boolean
}

export
function Header(opts: I_header_opts) {
	const sort_key = make_sort_key(opts.query_opts)
	return $Cont({},
		Select<I_sort_key>({
			options: [
				['time asc', () => text('最近查询 asc')],
				['time desc', () => text('最近查询 desc')],
				['alphabet asc', () => text('字母表 asc')],
				['alphabet desc', () => text('字母表 desc')],
			],
			value: {
				val: sort_key,
				set: v => {
					const [key, order] = v.split(' ')
					opts.query_opts.sort = { key, order } as I_voc__sort
				},
			},
		})
	)
}

const $Cont = $S('div', css({
	display: 'flex',
	alignItems: 'center',
	gap: '2em',
	input: {
		display: 'inline'
	}
}))

type I_sort_key = 'time asc' | 'time desc' | 'alphabet asc' | 'alphabet desc'
function make_sort_key(filter: I_voc__list_opts): I_sort_key {
	return `${filter.sort.key} ${filter.sort.order}`
}
