import { z } from 'zod'
import type { I_doc__word } from '../../db.ts'
import type { I_obj_id } from '../../util.ts'

export
type I_item__word = I_obj_id<I_doc__word<string, number>>

export
const schema__word: z.ZodType<I_item__word> = z.strictObject({
	_id: z.string().min(1),
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
