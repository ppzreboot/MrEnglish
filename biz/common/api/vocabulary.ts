export
type I_vocabulary__sort_type = 'include-time' | 'alphabet'

export
interface I_vocabulary {
	id: string
	word: string
	star: boolean
}

export
interface I_voc_filter {
	sort: {
		type: I_vocabulary__sort_type
		order: 'asc' | 'desc'
	}
	/** true: 已收藏; false: 未收藏; undefined: 全部 */
	star?: boolean
}

export
type I_voc_list_opts = I_voc_filter & {
	/** 上一页的 object-id */
	last_page?: string
}

export
const default_voc_list_opts: I_voc_filter = {
	sort: {
		type: 'include-time',
		order: 'desc',
	},
}
