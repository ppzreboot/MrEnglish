import { css } from 'goober'

export
const container = css({
	position: 'relative',

	button: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',

		height: '2.2em',
	},
	'.display': {
		background: 'var(--content-bg-color)',
		border: '1px solid rgba(var(--font-color), .15)',
		borderRadius: '.25em',

		display: 'grid',
		placeItems: 'center',
	},

	'&:focus-within': {
		'.display': {
			borderColor: 'rgba(var(--font-color), .3)',
		},
		'.dropdown': {
			display: 'block',
		},
	},
	'.dropdown': {
		display: 'none',
		paddingTop: '.4em',
		position: 'absolute',

		ul: {
			background: 'var(--content-bg-color)',
			border: '1px solid rgba(var(--font-color), .3)',
			borderRadius: '.25em',
			padding: '.3em 0',
		},
	},
})
