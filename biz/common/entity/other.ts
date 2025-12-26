import type { I_ecdict } from '@ppz-ai/ecdict-sqlite3'
import type { I_formatted_meriam_webster_entry } from '@ppz/meriam-webster'

export
interface I_lookup_result {
	ecdict: I_ecdict
	mw: null | I_formatted_meriam_webster_entry[]
}