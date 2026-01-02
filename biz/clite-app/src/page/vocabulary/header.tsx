import { styled } from 'goober'
import { I_voc_filter } from '@biz/common/api'
import { Radio_input } from '@biz/c/ui'
import { I_state } from '@biz/c/utils'

export
function Header(props: {
	filter: I_state<I_voc_filter>
	multi_select: I_state<boolean>
}) {
	const f = props.filter
	const m = props.multi_select
	return <$Cont>
		<Radio_input<'include-time' | 'alphabet'>
			title='排序'
			name='sort-type'
			list={[
				['include-time', '出现频率'],
				['alphabet', '字母表'],
			]}
			state={{
				val: f.val.sort.type,
				set: v =>
					f.set({
						sort: {
							type: v,
							order: f.val.sort.order,
						},
						star: f.val.star,
					})
			}}
		/>
		<Radio_input<'asc' | 'desc'>
			name='sort-order'
			list={[
				['asc', '升序'],
				['desc', '降序'],
			]}
			state={{
				val: f.val.sort.order,
				set: v =>
					f.set({
						sort: {
							type: f.val.sort.type,
							order: v,
						},
						star: f.val.star,
					})
			}}
		/>
		<Radio_input<true | false | undefined>
			title='收藏'
			name='star'
			list={[
				[undefined, '全部'],
				[true, '已收藏'],
				[false, '未收藏'],
			]}
			state={{
				val: f.val.star,
				set: v =>
					f.set({
						sort: f.val.sort,
						star: v,
					})
			}}
		/>
	</$Cont>
}

const $Cont = styled('div')({
	display: 'flex',
	alignItems: 'center',
	gap: '2em',
	input: {
		display: 'inline'
	}
})
