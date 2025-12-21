export
const escape_html = (value: string) =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;')

export
const html = (s: TemplateStringsArray, ...args: unknown[]) => {
	let result = ''
	for (let i=0; i<s.length; i++) {
		result += s[i]

		if (i < args.length) {
			if (typeof (args[i]) === 'string')
				result += args[i]
			else if (empty_val(args[i]))
				continue
			else
				throw Error('Not a String')
		}
	}
	return result
}

const empty_val = (val: unknown) =>
	val === null || val === undefined || val === false
