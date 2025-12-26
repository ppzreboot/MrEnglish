import type { ClassProp, CustomPayloads, Props, MaybeVNode } from 'hyperapp'
import { h } from 'hyperapp'

export
type I_H_props<S, C>
	= CustomPayloads<S, C>
	& Props<S>
	& {
		class?: Error
		className?: Error
	}

export
const H = (tag: string, classnames: ClassProp) =>
	<S, C = unknown>(
		props: I_H_props<S, C>,
		children?: MaybeVNode<S> | readonly MaybeVNode<S>[],
	) =>
		h<S, C>(
			tag,
			{
				...props,
				class: classnames,
			},
			children,
		)
