import { css } from 'goober'
import { $S, redraw } from '@biz/c/superfine'

interface I_play_state {
	playing: boolean
	svg_type: 0 | 1 | 2
	interval_id: number | null
}

export
const use_play = () => {
	const state: I_play_state = {
		playing: false,
		svg_type: 2,
		interval_id: null,
	}
	return {
		state,
		on_end() {
			clearInterval(state.interval_id!)
			state.playing = false
			state.svg_type = 2
			redraw()
		},
	}
}

export
const $Read_word = $S('button', css({
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
