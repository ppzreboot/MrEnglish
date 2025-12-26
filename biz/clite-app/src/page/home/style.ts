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
}

// 	.lookup-result {
// 		article.basic {
// 			.pronunciation-list {
// 				margin-bottom: var(--fs);
// 				display: flex;
// 				gap: var(--fs);
// 			}
// 			.inflection-list {
// 				display: flex;
// 				flex-wrap: wrap;
// 				column-gap: var(--fs);
// 				label {
// 					font-size: var(--fs-sm);
// 					opacity: .6;	
// 					margin-right: .4em;
// 				}
// 			}
// 		}
// 		article.e2e {
// 			.entry {
// 				&:not(:last-child) {
// 					margin-bottom: var(--fs);
// 				}
// 				h5.fl {
// 					opacity: .8;
// 					margin-bottom: calc(var(--fs) / 2);
// 					line-height: 1.2;
// 					font-family: serif, Times New Roman;
// 				}
// 			}
// 		}
// 		article.other-dict {
// 			p {
// 				a {
// 					margin-right: var(--fs);
// 					font-size: var(--fs-sm);
// 				}
// 			}
// 		}
// 	}
// }
