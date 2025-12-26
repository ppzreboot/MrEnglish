import type { I_clite_pages } from '@ppz/clite/common'

export
type I_page_key = 'home' | 'ai_trans' | 'voc_book' | 'setting'

export
const pages: I_clite_pages<I_page_key> = {
	home: {
		key: 'home',
		path: '/',
		title: '查单词',
	},
	ai_trans: {
		key: 'ai_trans',
		path: '/ai-trans',
		title: 'AI 翻译',
	},
	voc_book: {
		key: 'voc_book',
		path: '/voc-book',
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
