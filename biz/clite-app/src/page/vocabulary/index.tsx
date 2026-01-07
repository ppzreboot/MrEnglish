import { type I_page_opts__vocabulary } from '@biz/common/page'
import { Layout } from '@biz/c/ui2'
import { super_main } from '@biz/c/superfine'

import { Header } from './header/index.ts'
import { List } from './list/index.ts'
import { page_state } from './ss.ts'

const Page = (opts: I_page_opts__vocabulary) => {
	page_state.list = opts.list.map(record => ({
		record,
		selected: false,
	}))
	return () => Layout([
		Header(),
		List(),
	])
}

export
const main = super_main(Page)
