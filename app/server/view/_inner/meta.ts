export
interface I_page_meta {
	path: string
	title: string
}

type I_page_key = 'home' | 'ai_translate' | 'vocabulary_book' | 'setting'

export
const pages: Record<I_page_key, I_page_meta> = {
	home: {
		path: '/',
		title: '查单词',
	},
	ai_translate: {
		path: '/ai-trans',
		title: 'AI 翻译',
	},
	 vocabulary_book: {
		path: '/voc-book',
		title: '单词本',
	},
	 setting: {
		path: '/setting',
		title: '设置',
	},
}

export
const page_list = Object.values(pages)
