import {
	type I_formatted_meriam_webster_prs,
	make_audio_url,
} from '@mr-english/meriam-webster'
import { Icon__play_audio } from '@mr-english-client/ui'
import { useEffect, useRef, useState } from 'react'
import './mod.css'

export
function Read_word(props: I_formatted_meriam_webster_prs) {
	return props.audio !== undefined
		? <Read_word_with_audio ipa={props.ipa} audio={props.audio} />
		: <div className='mr-en-cmp--read-word'>
			<span>{props.ipa}</span>
		</div>
}

function Read_word_with_audio(props: { ipa: string, audio: string }) {
	const [playing, set_playing] = useState(false)
	const audio_ref = useRef<HTMLAudioElement>(null)

	useEffect(() => {
		const audio = audio_ref.current
		if (audio === null)
			throw Error('audio ref is null')
		const play = () => set_playing(false)
		audio!.addEventListener('ended', play)
		return () =>
			audio.removeEventListener('ended', play)
	}, [])

	return <div
		className='mr-en-cmp--read-word'
		onClick={() => {
			set_playing(true)
			audio_ref.current!.play()
		}}
	>
		<span>{props.ipa}</span>
		<Icon__play_audio playing={playing} />
		<audio
			ref={audio_ref}
			src={make_audio_url(props.audio)}
		/>
	</div>
}
