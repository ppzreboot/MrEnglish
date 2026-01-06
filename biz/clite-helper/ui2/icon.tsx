import { h, type I_props, type I_children } from '#/superfine/mod.ts'

const SVG = (props: I_props | undefined, children: I_children) =>
	h('svg', {
		viewBox: '0 0 24 24',
		fill: 'none',
		stroke: 'currentColor',
		'stroke-width': 2,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
		...props,
	}, children)

export
const SVG__thin_arrow = (props?: I_props) =>
	SVG(props, [
		h('path', { d: 'M8 6L12 2L16 6' }),
		h('path', { d: 'M12 2V22' }),
	])
