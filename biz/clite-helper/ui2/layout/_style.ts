import { css } from 'goober'
import { $S } from '#/superfine/mod.ts'

export
const $Layout = $S('div', css({
	minHeight: '100svh',
	display: 'flex',
	flexDirection: 'column',
}))

const padding = {
	padding: '0 2em',
	'@media (max-width: 500px)': {
		padding: '0 8px',
	},
}

export
const $Header = $S('header', css({
	display: 'flex',
	alignItems: 'center',
	height: '3em',
	...padding,
	h1: {
		width: '1px',
		height: '1px',
		opacity: '0',
	},
	nav: {
		marginLeft: 'auto',
		ul: {
			display: 'flex',
			gap: '1em',
		},
		h2: {
			fontSize: 'var(--fs)',
			fontWeight: '400',
			lineHeight: 'inherit',
			margin: '0',
		},
	},
}))

export
const $Main = $S('main', css({
	flexGrow: 1,
	alignSelf: 'center',
	width: 'min(100%, 1000px)',
	...padding,
}))

export
const $Footer = $S('footer', css({
	textAlign: 'center',
	fontSize: 'var(--fs-x-sm)',
	lineHeight: '3',
	marginTop: '2em',
	opacity: '.3',
}))
