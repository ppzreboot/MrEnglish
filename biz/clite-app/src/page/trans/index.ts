import { super_main, $S, h, text } from '@biz/c/superfine'
import { Layout_with_left } from '@biz/c/ui2'
import { Menu } from './menu.ts'

function Page(opts: void) {
	const layout = Layout_with_left()
	return () =>
		layout({},
			Menu,
			h('div', {}, text('main content')),
		)
}

export
const main = super_main(Page)
