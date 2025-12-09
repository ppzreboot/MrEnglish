import { z } from 'zod'
import type { I_doc__word } from '../../db.ts'

export
const schema__word: z.ZodType<I_doc__word<string, number>> = z.object({
	userid: z.string().min(1),
	word: z.string().min(1),
	star: z.boolean(),
	last_lookup_at: z.number().positive(),
	first_lookup_at: z.number().positive(),
})

export
const schema__api_output__get_lookup_history = z.array(
	schema__word
)

export
type I_api_output__get_lookup_history = z.infer<typeof schema__api_output__get_lookup_history>
