import type { I_ecdict } from '#lib/ecdict'
import type { I_formatted_meriam_webster_entry } from '#lib/meriam-webster'

export
interface I_lookup_result {
	ecdict: I_ecdict
	mw: null | I_formatted_meriam_webster_entry[]
}
