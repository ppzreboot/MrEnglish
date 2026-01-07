import { assert } from '@biz/common/util'
import { voc_api as api } from '@biz/common/api'
import { request } from '@biz/c/api'
import { redraw } from '@biz/c/superfine'

export
type I_item = {
	record: api.I_record
	selected: boolean
}

export
const page_state: {
	list: I_item[]
	opts: api.I_list_opts
	multi_select: boolean
	loading: boolean
} = {
	list: [],
	opts: api.default_list_opts(),
	multi_select: false,
	loading: false,
}

export
async function load(paged: boolean) {
	assert(page_state.loading === false, 'load on loading')
	page_state.loading = true
	redraw()
	try {
		const data = await request.post<api.I_record[]>(
			'/api/vocabulary',
			{
				...page_state.opts,
				last_page: paged
					? page_state.list.at(-1)?.record.id // string | undefined:w
					: undefined,
			},
		)
		const _list = data.map(record => ({
			record,
			selected: false,
		}))
		page_state.list = paged
			? page_state.list.concat(_list)
			: _list
	} finally {
		page_state.loading = false
		redraw()
	}
}
