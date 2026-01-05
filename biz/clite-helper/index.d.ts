declare module 'superfine' {
	export type I_tagname = keyof HTMLElementTagNameMap

	type VNode<Tag extends I_tagname | 'text node'> = {
		name: Tag
	}

	export type Children = VNode<I_tagname | 'text node'> | ReadonlyArray<Children>

	export type Props<T extends I_tagname> = {
		[attr_name in keyof HTMLElementTagNameMap[T]]?: HTMLElementTagNameMap[T][attr_name]
	} & {
		key?: number | string | undefined
	}
	export function h<T extends I_tagname>(
		tag: T,
		props: Props<T>,
		children?: Children
	): VNode<T>
	export function text(content: string): VNode<'text node'>

	export function patch(root: HTMLElement, v: VNode<I_tagname>): void
}
