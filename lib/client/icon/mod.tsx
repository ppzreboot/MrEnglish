import type { ReactNode } from 'react'

type I_icon = (props: { className?: string }) => ReactNode

export
const Icon_search: I_icon = props =>
	<svg
		className={'mr-english-svg ' + (props.className ?? '')}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		<path d='m21 21-4.34-4.34' />
		<circle cx='11' cy='11' r='8' />
	</svg>

export
const Icon__speak = (props: {
	className?: string
	type: 1 | 2 | 3
}) =>
	<svg
		className={'mr-english-svg ' + (props.className ?? '')}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		<path d='M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z' />
		{props.type >= 2 &&
			<path d='M16 9a5 5 0 0 1 0 6' />
		}
		{props.type === 3 &&
			<path d='M19.364 18.364a9 9 0 0 0 0-12.728' />
		}
	</svg>
