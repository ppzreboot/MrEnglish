export
type I_page_opts__ee_entry = {
	fl: string
	shortdef: string[]
}

export
interface I_lookup_record {
	id: string
	star: boolean
}

export
type I_page_opts__home = {
	type: 'empty'
} | {
	type: 'word not found'
	word: string
} | {
	type: 'normal'
	word: string
	record: I_lookup_record
	ee_entry_list: null | I_page_opts__ee_entry[]
}
