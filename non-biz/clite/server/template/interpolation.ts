type I_safe_interpolation
	= string
	| false
	| null
	| undefined
	| 0
	| I_safe_interpolation[]

const stringify = (val: I_safe_interpolation): string => {
	if (Array.isArray(val))
		return val.map(stringify).join('')
	if (typeof(val) === 'string')
		return val
	return ''
}

type I_html = (s: TemplateStringsArray, ...args: I_safe_interpolation[]) => string

export
const h: I_html = (s, ...args) => {
	let result = ''
	for (let i=0; i<s.length; i++) {
		result += s[i]
		if (i < args.length)
			result += stringify(args[i])
	}
	return result
}
