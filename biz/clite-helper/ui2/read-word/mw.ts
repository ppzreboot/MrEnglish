import type { I_formatted_meriam_webster_prs } from '@ppz/meriam-webster'
import { make_audio_url } from '@ppz/meriam-webster/url'
import { h, redraw, text } from '@biz/c/superfine'
import { SVG__speak } from '../icon.ts'
import { $Read_word, use_play } from './_.ts'

export
const Read_word = (props: I_formatted_meriam_webster_prs) =>
	props.audio !== undefined
		? Read_word_with_audio(props)
		: () => $Read_word({},
				h('span', {}, text(props.ipa))
			)

const Read_word_with_audio = (props: { ipa: string, audio: string }) => {
	const { state, on_end } = use_play()
	const audio = new Audio(make_audio_url(props.audio))
	audio.addEventListener('ended', on_end)
	return () => {
		return $Read_word(
			{
				onclick: () => {
					if (state.playing) {
						audio.pause()
						audio.currentTime = 0
						on_end()
					} else {
						state.playing = true
						audio.play()
						state.interval_id = setInterval(() => {
							state.svg_type = (state.svg_type + 1) % 3 as 0 | 1 | 2
							redraw()
						}, 100)
					}
				}
			},
			[
				h('span', {}, text(props.ipa)),
				SVG__speak(state.svg_type),
			],
		)
	}
}
