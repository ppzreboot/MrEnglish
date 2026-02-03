import type { I_formatted_meriam_webster_prs } from '@ppz/meriam-webster'
import { make_audio_url } from '@ppz/meriam-webster/url'
import { h, redraw, text } from '@biz/c/superfine'
import { SVG__speak } from '../icon.ts'
import { $Read_word } from './style.ts'

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
