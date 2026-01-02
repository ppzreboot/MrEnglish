import { cns } from '@biz/common/util'

export
const Radio_input = <K,>(props: {
	className?: string
	title?: string
	name: string
	list: [K, string][]
	state: {
		val: K
		set: (val: K) => void
	}
}) =>
	<div className={cns('radio-input', props.className)}>
		{props.title &&
			<span>{props.title}: </span>
		}
		{props.list.map(item =>
			<label key={String(item[0])}>
				<input
					type='radio'
					name={props.name}
					checked={props.state.val === item[0]}
					onChange={() => props.state.set(item[0])}
				/>
				{item[1]}
			</label>
		)}
	</div>
