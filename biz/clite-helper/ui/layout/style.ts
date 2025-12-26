import { H } from '@biz/c/hyperapp'
import { css } from 'goober'

export
const $ = {
	layout: H('div', css({
		maxWidth: '1000px',
		minHeight: '100svh',
		display: 'flex',
		flexDirection: 'column',
		margin: '0 auto',
		padding: '0 2em',
		'@media (max-width: 500px)': {
			padding: '0 8px',
		},
	})),

	header: H('header', css({
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '3em',
		'@media (min-width: 1000px)': {
			marginLeft: 'calc(50% - 50vw)',
			marginRight: 'calc(50% - 50vw + 10px)', /* 最后的 10px 是防止横向滚动条的 */
			paddingLeft: '2em',
			paddingRight: '2em',
		},
		h1: {
			width: '1px',
			height: '1px',
			opacity: '0',
		},
		nav: {
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
	})),
	main: H('main', css({
		flexGrow: 1,
	})),
	footer: H('footer', css({
		textAlign: 'center',
		fontSize: 'var(--fs-x-sm)',
		lineHeight: '3',
		marginTop: '2em',
		opacity: '.3',
	})),
}
