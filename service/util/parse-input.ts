import type { z } from 'zod'

export
function parse_input<T>(input: unknown, schema: z.ZodType<T>):
	| { ok: true; data: T }
	| { ok: false }
{
	const parsed = schema.safeParse(input)
	if (!parsed.success) {
		console.error('failed to validate json body', parsed.error)
		return { ok: false }
	}
	return { ok: true, data: parsed.data }
}
