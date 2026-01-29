import { Layout } from '@biz/c/ui2'
import { h, super_main } from '@biz/c/superfine'
import { type I_page_opts__home } from '@biz/common/page'

import { Main_input } from './input.ts'
import { make__Basic_explain } from './block/basic.ts'
import { Other_explain } from './block/other.ts'
import { init_state } from './ss.ts'
import { EE_explain } from './block/ee.tsx'

const Page = (opts: I_page_opts__home) => {
	const state = init_state(opts)
	const Basic_explain = opts.type === 'normal'
		? make__Basic_explain(opts.result)
		: () => null
	return () =>
		Layout({},
			[
				Main_input(state),
				opts.type !== 'empty' &&
					h('div', {}, [
						Basic_explain(),
						opts.type === 'normal' && opts.result.mw &&
							EE_explain(opts.result.mw),
						Other_explain(opts.word),
					]),
			],
		)
}

export
const main = super_main(Page)
