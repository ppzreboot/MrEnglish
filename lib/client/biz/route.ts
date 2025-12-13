export
const route_meta__home = {
	path: '/',
	title: '查单词',
}
export
const route_meta__ai_translate = {
	path: '/ai-trans',
	title: 'AI 翻译',
}
export
const route_meta__vocabulary_book = {
	path: '/voc-book',
	title: '单词本',
}
export
const route_meta__setting = {
	path: '/setting',
	title: '设置',
}

export
const route_meta_list = [
	route_meta__home,
	route_meta__ai_translate,
	route_meta__vocabulary_book,
	route_meta__setting,
]

export
const make_route__home = (q: string) =>
	`${route_meta__home.path}?q=${encodeURIComponent(q)}`
