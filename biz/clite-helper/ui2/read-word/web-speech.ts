import { redraw } from '@biz/c/superfine'
import { SVG__speak } from '../icon.ts'
import { $Read_word, use_play } from './_.ts'

export
const Read_word_with_web_speech = (word: string) => {
	const play = use_play()
	const synth = globalThis.speechSynthesis
	const utterance = new SpeechSynthesisUtterance(word)
	// utterance.lang = 'en-US'
	utterance.addEventListener('end', play.on_end)

	return () =>
		$Read_word(
			{
				onclick() {
					if (play.state.playing) {
						synth.cancel()
						play.on_end()
					} else {
						play.state.playing = true
						synth.speak(utterance)
						play.state.interval_id = setInterval(() => {
							play.state.svg_type = (play.state.svg_type + 1) % 3 as 0 | 1 | 2
							redraw()
						}, 100)
					}
				},
			},
			SVG__speak(play.state.svg_type),
		)
}