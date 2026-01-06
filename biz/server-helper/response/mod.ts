import type { I_clite_page_meta } from '@ppz/clite/common'
import {
	type I_clite_meta,
	respond_html,
	simple_page,
} from '@ppz/clite/server'

export
const respond_page = <K extends string>(props: {
	page_meta: I_clite_page_meta<K>
	clite_meta: I_clite_meta<K>
	opts: unknown
}) =>
	respond_html(
		simple_page({
			title: props.page_meta.title + ' - MrEnglish',
			page_meta: props.page_meta,
			clite_meta: props.clite_meta,
			opts: props.opts,
		})
	)
