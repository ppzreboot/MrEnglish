export
interface I_voc__record {
	id: string
	word: string
	star: boolean
}

export
type I_voc__sort_key = 'time' | 'alphabet'

export
interface I_voc__sort {
	key: I_voc__sort_key
	order: 'asc' | 'desc'
}
export
interface I_voc__list_opts {
	sort: I_voc__sort
	/** true: 已收藏; false: 未收藏; undefined: 全部 */
	star?: boolean
}

export
type I_voc__paged_list_opts = I_voc__list_opts & {
	/** 上一页的 object-id */
	last_page?: string
}

export
const default_voc_list_opts: I_voc__list_opts = {
	sort: {
		key: 'time',
		order: 'asc',
	},
}
