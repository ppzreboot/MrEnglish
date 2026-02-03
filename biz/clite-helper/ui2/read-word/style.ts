import { css } from 'goober'
import { $S } from '@biz/c/superfine'

export
const $Read_word = $S('div', css({
	fontSize: 'var(--fs-sm)',
	height: '2em',
	lineHeight: 1.5,
	borderRadius: '8px',
	backgroundColor: 'rgba(var(--font-color), .05)',
	padding: '0 .5em',

	display: 'inline-flex',
	alignItems: 'center',
	cursor: 'pointer',

	'&:active': {
		backgroundColor: 'rgba(var(--font-color), .1)',
	},

	span: {
		marginRight: '0.2em',
		'&::before, &::after': {
			content: '"/"',
			fontSize: 'var(--fs)',
			opacity: .6,
			margin: '0 .3em',
		}
	},
	svg: {
		width: '1em',
		height: '1em',
	},
}))
