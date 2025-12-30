import { useEffect, useState } from 'react'
import { Layout } from '@biz/c/ui'
import { Simple_main } from '@biz/c/main'
import type { I_page_opts__vocabulary } from '@biz/common/page'
import './index.css'

export
const main = Simple_main<I_page_opts__vocabulary>(props =>
	props.opts.list.map(voc =>
		<span key={voc.word}>{voc.word}</span>
	)
)

const Page = () => {
	const [list, set_list] = useState<I_item__word[] | null>(null)
	useEffect(() => {
		retrieve__history(null)
			.then(set_list)
	}, [])

	return <Layout>
		<div className='page word'>
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
	</Layout>
}

function List(props: {
	list: I_item__word[]
	load_more: (cursor: I_cursor__word) => void
}) {
	const last = props.list.at(-1)!
	return <ul className='word-list'>
		{props.list.map(item =>
			<li key={item.word}>
				<a
					className='word-wrapper reset'
					href={make_route__home(item.word)}
				>
					<label className='en-font'>{item.word}</label>
					<button
						className='icon-btn'
						onClickCapture={e => {
							e.preventDefault()
						}}>
						<Icon__close />
					</button>
				</a>
			</li>
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
