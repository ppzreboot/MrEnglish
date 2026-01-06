import { css } from 'goober'

export
const container = css({
	position: 'relative',

	label: {
		height: '2em',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
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

			'li:not(.active)': {
				color: 'var(--link-color)',
				cursor: 'default',
				opacity: .8,
				'&:hover': {
					opacity: 1,
				},
			},
		},
	},
})
