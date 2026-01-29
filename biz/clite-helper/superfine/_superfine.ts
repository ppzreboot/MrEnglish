import { h as _h, text as _text, patch as _patch } from 'superfine'

declare const _vnode: unique symbol

export
interface I_vnode {
	[_vnode]: true
}

type I_child = I_vnode | false | null

export
type I_children = I_child | I_child[]

export
interface I_props {
	[key: string]: unknown
}

export
const h = _h as (
	tagname: string,
	props: I_props,
	children?: I_children,
) => I_vnode

export
const text = _text as (content: string) => I_vnode

export
const patch = _patch as (root: HTMLElement, v: I_vnode) => void
