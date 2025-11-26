import { z } from 'zod'
import type { I_ecdict } from '@ppz-ai/ecdict-sqlite3'
import type { I_formatted_meriam_webster_entry } from '@mr-english/meriam-webster'

export
interface I_lookup_result {
	ecdict: I_ecdict
	mw?: I_formatted_meriam_webster_entry[]
}

const schema__inflection_type = z.literal(['did', 'done', 'ing', 'does', 'er', 'est', 's'])

const schema__mw_entry: z.ZodType<I_formatted_meriam_webster_entry> = z.object({
	hw: z.string().min(1),
	prs: z.array(
		z.strictObject({
			ipa: z.string().min(1),
			audio: z.string().min(1).optional(),
		})
	).optional(),
	fl: z.string().optional(),
	shortdef: z.array(z.string().min(1)),
})

export
const schema__api_output__lookup_result: z.ZodType<I_lookup_result | null> =
	z.strictObject({
		ecdict: z.strictObject({
			word: z.string().min(1),
			phonetic: z.string().min(1).nullable(),
			definition: z.array(z.string().min(1)),
			translation: z.array(z.string().min(1)),
			collins: z.literal([1,2,3,4,5,null]),
			oxford: z.boolean(),
			bnc: z.number().int().min(1).nullable(),
			frq: z.number().int().min(1).nullable(),
			lemma: z.strictObject({
				lemma: z.string().min(1),
				type: z.array(schema__inflection_type),
			}).nullable(),
			inflection: z.record(schema__inflection_type, z.string().optional())
		}),
		mw: z.array(schema__mw_entry).optional(),
	}).nullable()
