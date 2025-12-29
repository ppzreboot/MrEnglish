import { H } from '@biz/c/hyperapp'
import { css } from 'goober'

export
const $ = {
	main_input: H('div', ['main-content', css({
		display: 'flex',
		alignItems: 'center',
		gap: 'var(--fs)',
	})]),

	input: H('input', ['en-font', css({
		flex: 1,
		'@media (min-width: 600px)': {
			textAlign: 'center',
			fontSize: 'calc(var(--fs) * 2)',
			height: 'calc(var(--fs) * 3)',
		},
		'@media (max-width: 600px)': {
			height: 'calc(var(--fs-lg) * 1.5)',
		},
	})]),

	button: H('button', ['icon-btn', css({
		fontSize: '1.5rem',
		'@media (max-width: 600px)': {
			fontSize: '1rem',
		},
	})]),

	lookup_result: H('div', css({
		'article.basic': {
			'.pronunciation-list': {
				marginBottom: 'var(--fs)',
				display: 'flex',
				gap: 'var(--fs)',
			},
			'.inflection-list': {
				display: 'flex',
				flexWrap: 'wrap',
				columnGap: 'var(--fs)',
				label: {
					fontSize: 'var(--fs-sm)',
					opacity: .6,
					marginRight: '.4em',
				}
			}
		},
		'article.e2e': {
			'.entry': {
				'&:not(:last-child)': {
					marginBottom: 'var(--fs)',
				},
				'h5.fl': {
					opacity: .8,
					marginBottom: 'calc(var(--fs) / 2)',
					lineHeight: 1.2,
					fontFamily: 'serif, Times New Roman',
				}
			}
		},
		'article.other-dict': {
			p: {
				a: {
					marginRight: 'var(--fs)',
					fontSize: 'var(--fs-sm)',
				}
			}
		},
	})),
}
