import { z } from 'zod'

const schema__api_output = <Data>(data: z.ZodType<Data>) =>
	z.union([
		z.object({
			error: z.literal(true),
			msg: z.string().min(1),
		}),
		z.object({
			error: z.literal(false),
			data,
		}),
	])

export
type I_api_output<Data, Error> = Promise<[Error, null] | [null, Data]>

export
class API_error extends Error {
	constructor(api_name: string, msg: string) {
		super(`API Error - ${api_name} - ${msg}`)
	}
}

export
async function output<Data>(api_name: string, response: Response, schema: z.ZodType<Data>) {
	if (!response.ok)
		throw new API_error(api_name, `http error -- ${response.status} ${response.statusText}`)
	const raw_body = await read_body()
	const json_body = parse_body()
	const parsed = schema__api_output(schema).safeParse(json_body)
	if (parsed.error)
		throw new API_error(api_name, `zod validate\n ${z.prettifyError(parsed.error)}`)
	if (parsed.data.error)
		throw new API_error(api_name, `server error -- ${parsed.data.msg}`)
	return parsed.data.data

	async function read_body() {
		try {
			return await response.text()
		} catch(err) {
			console.error('error on reading response body', err)
			throw new API_error(api_name, `reading body`)
		}
	}
	function parse_body() {
		try {
			return JSON.parse(raw_body)
		} catch(err) {
			console.error('error on parsing body', err)
			throw new API_error(api_name, `parsing body`)
		}
	}
}
