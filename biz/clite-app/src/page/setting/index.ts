import { h, text, super_main } from '@biz/c/superfine'
import { Layout } from '@biz/c/ui2'

export
const main = super_main(() =>
	() =>
		Layout({}, [
			h('a',
				{
					href: '/logout',
				},
				text('退出登录'),
			)
		])
)
