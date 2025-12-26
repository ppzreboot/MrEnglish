import { I_lookup_result } from '@biz/common/entity'
import type { I_word_record } from '@biz/common/api'
import { simple_page } from '@ppz/clite/server'
import { pages } from '@biz/common/page'

type I_render_opts = {
	type: 'empty'
} | {
	type: 'word not found'
	word: string
} | {
	type: 'normal'
	word: string
	record: I_word_record
	lookup_result: I_lookup_result
}

export
const home_page = (opts: I_render_opts) =>
	simple_page({
		clite_meta,
		page_meta: pages.home,
		title: () => '',
		opts,
	})
