import { H } from '../../hyperapp/mod.ts'
import { css } from 'goober'

export
const $ = {
	read_word: (tag: 'button' | 'div') =>
		H(tag, css({
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
				marginRight: '.2em',
				'&::before, &::after': {
					content: '/',
					fontSize: 'var(--fs)',
					opacity: .6,
					margin: '0 .3em',
				}
			},
			svg: {
				fontSize: 'var(--fs-sm)',
			}
		}))
	,
}
