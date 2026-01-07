const parse_body = async <Data>(res: Response) => {
	const data = await res.json()
	if (data.error)
		throw Error(`error from server, key: ${data.key}`)
	return data.data as Data
}

export
const request = {
	get: <Data = null>(url: string) =>
		fetch(url)
			.then(parse_body<Data>)
	,
	post: <Data = null>(url: string, data: unknown, abort_signal?: AbortSignal) =>
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			signal: abort_signal,
		})
			.then(parse_body<Data>)
	,
}
