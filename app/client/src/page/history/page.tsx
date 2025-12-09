import { useEffect, useState } from 'react'
import { I_doc__word } from '@mr-english/schema'
import { Loading } from '@mr-english-client/ui'
import { retrieve__history } from '../../api/word.ts'

export
function History_page() {
	const [list, set_list] = useState<I_doc__word<string, number>[] | null>(null)
	useEffect(() => {
		retrieve__history(null)
			.then(set_list)
	}, [])

	return <div className='page no-header history'>
		{list === null
			? <Loading />
			: <List list={list} />
		}
	</div>
}

function List(props: { list: I_doc__word<string, number>[] }) {
	return <ul>
		{props.list.map(item =>
			<li key={item.word}>{item.word}</li>
		)}
	</ul>
}
