import { useEffect, useState } from 'react'
import { Loading } from '@mr-english-client/ui'
import { retrieve__history, type I_cursor__word } from '../../api/word.ts'
import type { I_item__word } from '@mr-english/schema'

export
function History_page() {
	const [list, set_list] = useState<I_item__word[] | null>(null)
	useEffect(() => {
		retrieve__history(null)
			.then(set_list)
	}, [])

	return <div className='page no-header history'>
		{list === null ? <Loading />
			: list.length === 0 ? <div>暂无记录</div>
			: <List
				list={list}
				load_more={cursor => {
					retrieve__history(cursor)
						.then(more => {
							if (more.length === 0)
								console.log('noty: no more')
							else
								set_list([...list, ...more])
						})
				}}
			/>
		}
	</div>
}

function List(props: {
	list: I_item__word[]
	load_more: (cursor: I_cursor__word) => void
}) {
	const last = props.list.at(-1)!
	return <ul>
		{props.list.map(item =>
			<li key={item.word}>{item.word}</li>
		)}
		<li
			onClick={() =>
				props.load_more({
					id: last._id,
					update_at: last.last_lookup_at,
				})
			}
		>加载更多</li>
	</ul>
}
