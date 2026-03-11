import { z } from 'zod'
import { type NextRequest, NextResponse } from 'next/server'

type I_error_or_data<D>
	= { ok: true, data: D }
	| { ok: false, error: string }

export
const API = <
	P,
	D,
	E extends Exclude<unknown, null>,
	S,
>(
	_: {
		params: (p: P) => P
		data: (d: D) => D
		error: (e: E) => E
		success: (s: S) => S
	},
	handler:
		(input: {
			params: (check: z.ZodType<P>) => I_error_or_data<P>
			data: (check: z.ZodType<D>) => Promise<I_error_or_data<D>>
		}) => Promise<NextResponse
			| { ok: true, data: S }
			| { ok: false, error: E }
		>
	,
) =>
	async (req: NextRequest) => {
		const result = await handler({
			params(check) {
				const { searchParams } = new URL(req.url)
				const entries = Array.from(searchParams.entries())
				const parsed = check.safeParse(Object.fromEntries(entries))
				if (parsed.success)
					return { ok: true, data: parsed.data }
				return { ok: false, error: z.prettifyError(parsed.error) }
			},
			async data(check) {
				const parsed = check.safeParse(await req.json())
				if (parsed.success)
					return { ok: true, data: parsed.data }
				return { ok: false, error: z.prettifyError(parsed.error) }
			},
		})
		if (result instanceof NextResponse)
			return result
		return NextResponse.json(result)
	}
