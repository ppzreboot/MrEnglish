import type { SVGProps } from 'react'

type I_svg_props = SVGProps<SVGSVGElement>

const SVG = (props: I_svg_props) =>
	<svg
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	/>

export
const SVG__speak = (props: {
	type: 0 | 1 | 2
	svg?: I_svg_props
}) =>
	<SVG {...props.svg}>
		<path d='M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z' />
		{props.type >= 1 &&
			<path d='M16 9a5 5 0 0 1 0 6' />
		}
		{props.type === 2 &&
			<path d='M19.364 18.364a9 9 0 0 0 0-12.728' />
		}
	</SVG>

export
const SVG__star = (props: {
	fill: boolean
	svg?: I_svg_props
}) => {
	return <SVG
		{...props.svg}
		fill={props.fill ? 'currentColor' : 'none'}
	>
		<path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
	</SVG>
}

export
const SVG__menu = (props: I_svg_props) =>
	<SVG {...props}>
		<rect width="7" height="7" x="3" y="3" rx="1"/>
		<rect width="7" height="7" x="14" y="3" rx="1"/>
		<rect width="7" height="7" x="14" y="14" rx="1"/>
		<rect width="7" height="7" x="3" y="14" rx="1"/>
	</SVG>


export
const SVG__search = (props: I_svg_props) =>
	<SVG {...props}>
		<path d='m21 21-4.34-4.34' />
		<circle cx='11' cy='11' r='8' />
	</SVG>

export
const SVG__close = (props?: I_svg_props) =>
	<SVG {...props}>
		<path d='M18 6 6 18' />
		<path d='m6 6 12 12' />
	</SVG>
