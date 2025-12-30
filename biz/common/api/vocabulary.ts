export
type I_vocabulary__sort_type = 'include-time' | 'alphabet'

export
interface I_vocabulary {
	id: string
	word: string
	star: boolean
}

export
interface I_voc_list_opts {
	sort: {
		type: I_vocabulary__sort_type
		order: 'asc' | 'desc'
	}
	star?: boolean
	/** 上一页的 object-id */
	last_page?: string
}

export
const default_voc_list_opts: I_voc_list_opts = {
	sort: {
		type: 'include-time',
		order: 'desc',
	},
}
