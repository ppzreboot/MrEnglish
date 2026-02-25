import { super_main, $S, h, text } from '@biz/c/superfine'
import { Layout_with_left } from '@biz/c/ui2'
import { Menu } from './menu.ts'
import { Chat } from './chat/index.ts'

function Page(opts: void) {
	console.log(opts)
	const layout = Layout_with_left()
	return () =>
		layout({},
			Menu,
			Chat(),
		)
}

export
const main = super_main(Page)
