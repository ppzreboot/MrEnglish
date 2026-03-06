import type { NextRequest } from 'next/server'
import type { z } from 'zod'

export
async function parse_json_body<T extends z.ZodType>(
	request: NextRequest,
	schema: T,
): Promise<
	| { ok: true; data: z.infer<T> }
	| { ok: false }
> {
	let body: unknown
	try {
		body = await request.json()
	} catch {
		console.error('failed to parse json body')
		return { ok: false }
	}
	const parsed = schema.safeParse(body)
	if (!parsed.success) {
		console.error('failed to validate json body', parsed.error)
		return { ok: false }
	}
	return { ok: true, data: parsed.data }
}
