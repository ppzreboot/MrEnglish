import { z } from 'zod'

export
const z__word_record = z.strictObject({
	id: z.string().min(1),
	word: z.string().min(1),
	star: z.boolean(),
})

export
type I_word_record = z.infer<typeof z__word_record>

export
const z__word_record_list = z.array(
	z__word_record
)
