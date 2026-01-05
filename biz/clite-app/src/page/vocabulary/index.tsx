import { Layout } from '@biz/c/ui2'
import { type I_page_opts__vocabulary } from '@biz/common/page'
import {
	default_voc_list_opts,
} from '@biz/common/api'
import { super_main } from '@biz/c/superfine'
import { Header, I_header_opts } from './header/index.ts'

const Page = (opts: I_page_opts__vocabulary) => {
	let voc_list = opts.list
	const header_props: I_header_opts = {
		query_opts: default_voc_list_opts,
		multi_select: false,
	}
	return () => Layout([
		Header(header_props)
	])
}

export
const main = super_main(Page)
