import { css } from 'goober'

export
const container = css({
	position: 'relative',

	label: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',

		height: '2em',
		cursor: 'pointer',
	},
	'.display': {
		background: 'var(--content-bg-color)',
		border: '1px solid rgba(var(--font-color), .08)',
		borderRadius: '.25em',

		display: 'grid',
		placeItems: 'center',
	},

	'&:hover .dropdown, .display:focus + .dropdown': {
		display: 'block',
	},
	'.dropdown': {
		display: 'none',
		paddingTop: '.3em',
		position: 'absolute',

		ul: {
			background: 'var(--content-bg-color)',
			border: '1px solid rgba(var(--font-color), .08)',
			borderRadius: '.25em',

			padding: '.2em 0',

			'li.active': {
				label: {
					opacity: .6,
					cursor: 'default',
				},
			},
		},
	},
})
