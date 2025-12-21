export
interface I_real_interpolation {
	value: string
	real_interpolation: true
}
type I_empty_interpolation = null | false | undefined
type I_safe_interpolation
	= I_empty_interpolation
	| I_real_interpolation
	| I_real_interpolation[]

type I_html = (s: TemplateStringsArray, ...args: I_safe_interpolation[])
	=> I_real_interpolation

/**
 * 不允许插值 string，是为了避免:
 *  ``` ts
 *  const tmpl =
 *		h`<div>
 * 	  	${a === b &&
 * 				`vulnerable interpolation
 * 					${b === c &&
 * 						'wrong!!!'
 * 					}
 * 				`
 *			}
 *		</div>`
 *  ```
 */
export
const h: I_html = (s, ...args) => {
	let result = ''
	for (let i=0; i<s.length; i++) {
		result += s[i]

		if (i < args.length) {
			const a = args[i]
			if (!empty_val(a))
				result += Array.isArray(a)
					? a.map(i => i.value).join('')
					: a.value
		}
	}
	return {
		real_interpolation: true,
		value: result,
	}
}

const empty_val = (val: I_safe_interpolation): val is I_empty_interpolation =>
	val === null || val === undefined || val === false

/** Simple, Safe interpolation */
export
const s = (value: string): I_real_interpolation => ({
	value,
	real_interpolation: true,
})
