import { h, text, type Action } from 'hyperapp'
import { speak_icon } from '../icon.ts'
import { $ } from './style.ts'

export
interface I_prn_audio__playing<S> {
	playing: true
	interval_id: number
	status: 0 | 1 | 2 | 3
	on_stop: Action<S>
}

export
interface I_prn_audio__stopped<S> {
	playing: false
	on_start: Action<S>
}

export
type I_prn_audio<S> = I_prn_audio__playing<S> | I_prn_audio__stopped<S>

export
const Read_word = <S>(props: {
	ipa: string
	audio?: I_prn_audio<S>
}) =>
	props.audio !== undefined
		? Read_word_with_audio<S>(props.ipa, props.audio)
		: $.read_word('div')<S>({}, [
			h('span', {}, [text(props.ipa)]),
		])

const Read_word_with_audio = <S>(ipa: string, props: I_prn_audio<S>) =>
	$.read_word('button')<S>({
		disabled: props.playing,
		onclick: () => {
			if (props.playing === false)
				return props.on_start
			throw Error('start play when playing')
		},
	}, [
		h('span', {}, [text(ipa)]),
		speak_icon<S>(props.playing
			? props.status
			: 3
		),
	])
