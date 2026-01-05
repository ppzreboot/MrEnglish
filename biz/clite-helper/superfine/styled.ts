import { h } from 'superfine'
import type { Props, I_tagname, Children } from 'superfine'

export
const $S = <Tag extends I_tagname>(tag: Tag, className: string) =>
	(props: Props<Tag>, children?: Children) => {
		let c = className
		if (typeof (props.className) === 'string')
			c = props.className + ' ' + c

		return h(tag, {
			...props,
			className: c,
		}, children)
	}
