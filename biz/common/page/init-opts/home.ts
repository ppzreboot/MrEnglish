import type { I_lookup_result } from '../../entity/other.ts'

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
	result: I_lookup_result
}
