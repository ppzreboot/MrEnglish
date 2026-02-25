import type { I_clite_pages } from '@ppz/clite/common'

export
type I_page_key
	= 'home'
	| 'vocabulary'
	| 'setting'
	| 'trans'
	| 'trans_new'

export
const pages: I_clite_pages<I_page_key> = {
	home: {
		key: 'home',
		path: '/',
		title: '查单词',
		show_in_nav: true,
	},
	trans: {
		key: 'trans',
		path: '/trans',
		title: '翻译',
		show_in_nav: true,
	},
	trans_new: {
		key: 'trans_new',
		path: '/trans/new',
		title: '创建翻译会话',
		show_in_nav: false,
	},
	vocabulary: {
		key: 'vocabulary',
		path: '/vocabulary',
		title: '单词本',
		show_in_nav: true,
	},
	setting: {
		key: 'setting',
		path: '/setting',
		title: '设置',
		show_in_nav: true,
	},
}

export
const page_list = Object.values(pages)

const page_key_list = Object.keys(pages)
export
function is_page_key(key: string): key is I_page_key {
	return page_key_list.includes(key)
}
