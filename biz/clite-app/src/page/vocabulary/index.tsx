import { useState } from 'react'
import { Layout, SVG__close } from '@biz/c/ui'
import { Simple_main } from '@biz/c/main'
import { home_page_url, type I_page_opts__vocabulary } from '@biz/common/page'
import {
	type I_voc_filter,
	type I_vocabulary,
	default_voc_list_opts,
} from '@biz/common/api'

import './index.css'
import { Filter } from './filter.tsx'

const Page = (props: { opts: I_page_opts__vocabulary }) => {
	const [filter, set_filter] = useState<I_voc_filter>(default_voc_list_opts)
	const voc_list = props.opts.list
	return <Layout>
		<Filter state={{ val: filter, set: set_filter }} />
		<div className='page word'>
			{ voc_list.length === 0 ? <div>暂无记录</div> :
				<List
					list={voc_list}
				/>
			}
		</div>
	</Layout>
}

function List(props: {
	list: I_vocabulary[]
	// load_more: (cursor: I_cursor__word) => void
}) {
	const last = props.list.at(-1)!
	return <ul className='word-list'>
		{props.list.map(item =>
			<li key={item.word}>
				<a
					className='word-wrapper reset'
					href={home_page_url(item.word)}
				>
					<label className='en-font'>{item.word}</label>
					<button
						className='icon-btn'
						onClickCapture={e => {
							e.preventDefault()
						}}>
						<SVG__close />
					</button>
				</a>
			</li>
		)}
		<li
		>加载更多</li>
	</ul>
}

export
const main = Simple_main<I_page_opts__vocabulary>(Page)
