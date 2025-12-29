import { useEffect, useRef, useState } from 'react'
import {
	type I_formatted_meriam_webster_prs,
	make_audio_url,
} from '@ppz/meriam-webster'
import { SVG__speak } from '#/ui/icon.tsx'
import { styled } from 'goober'

export
function Read_word(props: I_formatted_meriam_webster_prs) {
	return props.audio !== undefined
		? <Read_word_with_audio ipa={props.ipa} audio={props.audio} />
		: <$Read_word>
			<span>{props.ipa}</span>
		</$Read_word>
}

type I_state = {
	playing: false
} | {
	playing: true
	svg_type: 0 | 1 | 2 | 3
}

function Read_word_with_audio(props: { ipa: string, audio: string }) {
	const [state, set_state] = useState<I_state>({ playing: false })
	const audio_ref = useRef<HTMLAudioElement>(null)

	useEffect(() => {
		if (state.playing) {
			const interval_id = setInterval(() => {
				set_state(s => {
					if (s.playing)
						return {
							playing: true,
							svg_type: (s.svg_type + 1) % 4 as 0 | 1 | 2 | 3,
						}
					else
						return s
				})
			}, 300)
			return () => clearInterval(interval_id)
		}
	}, [state.playing])

	return <$Read_word
		onClick={() => {
			set_state({ playing: true, svg_type: 0 })
			audio_ref.current!.play()
		}}
	>
		<span>{props.ipa}</span>
		<SVG__speak
			type={state.playing ? state.svg_type : 3}
		/>
		<audio
			ref={audio_ref}
			src={make_audio_url(props.audio)}
			onEnded={() => {
				set_state({ playing: false })
			}}
		/>
	</$Read_word>
}

const $Read_word = styled('div')({
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
})
