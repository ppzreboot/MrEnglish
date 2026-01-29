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

export
const SVG__search = (props?: I_props) =>
	SVG(props, [
		h('path', { d: 'm21 21-4.34-4.34' }),
		h('circle', { cx: 11, cy: 11, r: 8 }),
	])

export
const SVG__star = (fill: boolean, props?: I_props) => SVG(
	{
		...props,
		fill: fill ? 'currentColor' : 'none',
	},
	[
		h('path',
			{
				d: 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'
			}
		)
	]
)

export
const SVG__speak = (type: 0 | 1 | 2, props?: I_props) =>
	SVG(props, [
		h('path', {
			d: 'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z'
		}),
		type >= 1 &&
			h('path', { d: 'M16 9a5 5 0 0 1 0 6' })
		,
		type === 2 &&
			h('path', { d: 'M19.364 18.364a9 9 0 0 0 0-12.728' })
		,
	])
