import { page_list } from '@biz/common/page'
import { h, text } from '#/superfine/mod.ts'

const current_path = location.pathname

export
const Nav = () =>
	h('nav', {}, [
		h('ul', {},
			page_list.map(p =>
				h('li', { key: p.key },
					p.path === current_path
						? h('h2', {}, text(p.title))
						: h('a', { href: p.path }, text(p.title))
				)
			)
		)
	])
