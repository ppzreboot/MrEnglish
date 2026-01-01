import { I_voc_filter } from '@biz/common/api'

export
function Filter(props: {
	state: {
		val: I_voc_filter
		set: (val: I_voc_filter) => void
	}
}) {
	const { val, set } = props.state
	return <div>
		<select
			value={val.sort.type}
			onChange={e => {
				set({
					sort: {
						type: e.target.value,
						order: val.sort.order,
					},
					star: val.star,
				})
			}}>
			<option value='include-time'>收录时间</option>
			<option value='alphabet'>字母表</option>
		</select>
		<select
			value={val.sort.order}
			onChange={e => {
				set({
					sort: {
						type: val.sort.type,
						order: e.target.value,
					},
					star: val.star,
				})
			}}>
			<option value='desc'>降序</option>
			<option value='asc'>升序</option>
		</select>
	</div>
}
