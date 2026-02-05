import { redraw } from '@biz/c/superfine'
import { SVG__speak } from '../icon.ts'
import { $Read_word, use_play } from './_.ts'

interface I_read {
	play(): void
	stop(): void
	on_end(on_end: () => void): void
}

export
const Read_word_with_web_speech = (read: I_read) => {
	const play = use_play()
	read.on_end(play.on_end)

	return () =>
		$Read_word(
			{
				onclick() {
					if (play.state.playing) {
						read.stop()
						play.on_end()
					} else {
						play.state.playing = true
						read.play()
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
