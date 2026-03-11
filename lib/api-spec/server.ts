import { type NextRequest, NextResponse } from 'next/server'

export
const API = <
	P,
	D,
	E extends Exclude<unknown, null>,
	S,
>(
	_: {
		params: P
		data: D
		error: (e: E) => E
		success: (s: S) => S
	},
	handler:
		(input: {
			params: () => P
			data: () => Promise<D>
		}) => Promise<NextResponse | {
			error: null
			data: S
		} | {
			error: E
			data: null
		}>
	,
) =>
	async (req: NextRequest) => {
		const result = await handler({
			params() {
				const { searchParams } = new URL(req.url)
				const entries = Array.from(searchParams.entries())
				return Object.fromEntries(entries) as P
			},
			async data() {
				return await req.json() as D
			},
		})
		if (result instanceof NextResponse)
			return result
		return NextResponse.json(result)
	}
