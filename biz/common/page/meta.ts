import type { I_clite_pages } from '@ppz/clite/common'

export
type I_page_key = 'home' | 'trans' | 'vocabulary' | 'setting'

export
const pages: I_clite_pages<I_page_key> = {
	home: {
		key: 'home',
		path: '/',
		title: '查单词',
	},
	trans: {
		key: 'trans',
		path: '/trans',
		title: '翻译',
	},
	vocabulary: {
		key: 'vocabulary',
		path: '/vocabulary',
		title: '单词本',
	},
	setting: {
		key: 'setting',
		path: '/setting',
		title: '设置',
	},
}

export
const page_list = Object.values(pages)

const page_key_list = Object.keys(pages)
export
function is_page_key(key: string): key is I_page_key {
	return page_key_list.includes(key)
}
