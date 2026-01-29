import { css } from 'goober'
import type { I_formatted_meriam_webster_prs } from '@ppz/meriam-webster'
import { make_audio_url } from '@ppz/meriam-webster/url'
import { $S, h, redraw, text } from '@biz/c/superfine'
import { SVG__speak } from '../icon.ts'

export
const Read_word = (props: I_formatted_meriam_webster_prs) =>
	props.audio !== undefined
		? Read_word_with_audio(props)
		: () => $Read_word({},
				h('span', {}, text(props.ipa))
			)

const Read_word_with_audio = (props: { ipa: string, audio: string }) => {
	let playing = false
	let svg_type: 0 | 1 | 2 = 2
	let interval_id: number
	const audio = new Audio(make_audio_url(props.audio))
	const on_end = () => {
		clearInterval(interval_id)
		playing = false
		svg_type = 2
		redraw()
	}
	audio.addEventListener('ended', on_end)
	return () => {
		return $Read_word(
			{
				onclick: () => {
					if (playing) {
						playing = false
						audio.pause()
						audio.currentTime = 0
						on_end()
					} else {
						playing = true
						audio.play()
						interval_id = setInterval(() => {
							svg_type = (svg_type + 1) % 3
							redraw()
						}, 100)
					}
				}
			},
			[
				h('span', {}, text(props.ipa)),
				SVG__speak(svg_type),
			],
		)
	}
}

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
