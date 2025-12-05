import { useState } from 'react'
import { Icon__star } from '@mr-english-client/icon'

export
function Star(props: {
	className?: string
	value: boolean
	on_click: () => void
}) {
	const [loading, set_loading] = useState(false)

	return <button
		className={props.className + ' icon-btn'}
		disabled={loading}
		onClick={async () => {
			try {
				set_loading(true)
				await props.on_click()
			} finally {
				set_loading(false)
			}
		}}
	>
		<Icon__star fill={props.value} />
	</button>
}
