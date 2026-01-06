import { type I_children, type I_props, h } from './_superfine.ts'

export
const $S = (tag: string, className: string) =>
	(props: I_props, children?: I_children) => {
		let c = className
		if (typeof (props.className) === 'string')
			c = props.className + ' ' + c

		return h(tag, {
			...props,
			className: c,
		}, children)
	}
