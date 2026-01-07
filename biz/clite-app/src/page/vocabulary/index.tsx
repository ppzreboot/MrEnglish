import { type I_page_opts__vocabulary } from '@biz/common/page'
import { voc_api as api } from '@biz/common/api'
import { Layout } from '@biz/c/ui2'
import { redraw, super_main } from '@biz/c/superfine'
import { request } from '@biz/c/api'

import { Header } from './header/index.ts'
import { I_item, make_List } from './list/index.ts'

const Page = (opts: I_page_opts__vocabulary) => {
	const list_opts = api.default_list_opts
	const multi_select = false

	const list = opts.list.map<I_item>(record => ({
		record,
		selected: false,
	}))
	const List = make_List({
		list,
		multi_select,
		load_more,
	})
	return () => Layout([
		Header({ list_opts, multi_select }),
		List(multi_select),
	])

	async function load_more() {
		const last_page = list.at(-1)!.record.id
		const _list = await request.post<api.I_record[]>('/api/vocabulary',
			{
				...list_opts,
				last_page,
			},
		)
		list.push(
			..._list.map(record => ({
				record,
				selected: false,
			}))
		)
		redraw()
	}
}

export
const main = super_main(Page)
