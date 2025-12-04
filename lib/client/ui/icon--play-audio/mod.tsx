import { useEffect, useState } from 'react'
import { Icon__speak } from '@mr-english-client/icon'

export
function Icon__play_audio(props: {
	className?: string
	playing: boolean
}) {
	const [type, set_type] = useState<1 | 2 | 3>(3)
	useEffect(() => {
		const timeid = setInterval(() => {
			set_type(val =>
				(val === 3 ? 1 : val + 1) as 1 | 2 | 3
			)
		}, 200)
		return () => clearInterval(timeid)
	})
	return <Icon__speak
		className={props.className}
		type={type}
	/>
}
