import type { I_page_opts__home } from '@biz/common/page'
import { styled } from 'goober'
import { I_lookup_result } from '@biz/common/entity'
import { Read_word, Layout } from '@biz/c/ui'
import { Simple_main } from '@biz/c/main'

import { Main_input } from './input.tsx'

const Basic_explain = (props: I_lookup_result) => {
	const prn_list = props.mw === null ? [] :
		props.mw
			.map(entry => entry.prs)
			.filter(prs => prs !== undefined)
			.flat()
	return <$Basic_details className='main-content'>
		<h5>简明释义</h5>
		<ul className='pronunciation-list'>
			{prn_list.map((prn, index) =>
				<li key={index}>
					<Read_word {...prn} />
				</li>
			)}
		</ul>
	</$Basic_details>
}

const ee_short_def = (list: I_page_opts__ee_entry[]) =>
	app({
		node: document.querySelector('.entries')!,
		init: {},
		view: () =>
			h('div', {},
				list.map(entry =>
					h('div', { class: 'entry' }, [
						h('h5', { class: 'fl' },
							text(entry.fl)
						),
						h('ul', { class: 'list' },
							entry.shortdef.map(def =>
								h('li', { class: 'txt-item' },
									text(def)
								)
							)
						)
					])
				)
			)
	})

export
const main = Simple_main<I_page_opts__home>(props =>
	<Layout>
		<Main_input {...props.opts} />
		<div>
			{props.opts.type === 'normal' &&
				<Basic_explain {...props.opts.result} />
			}
		</div>
	</Layout>
)
const $Basic_details = styled('article')({
	'.pronunciation-list': {
		marginBottom: 'var(--fs)',
		display: 'flex',
		gap: 'var(--fs)',
	},
	'.inflection-list': {
		display: 'flex',
		flexWrap: 'wrap',
		columnGap: 'var(--fs)',
		label: {
			fontSize: 'var(--fs-sm)',
			opacity: .6,
			marginRight: '.4em',
		}
	}
})
const $EE_details = styled('article')({
	'.entry': {
		'&:not(:last-child)': {
			marginBottom: 'var(--fs)',
		},
		'h5.fl': {
			opacity: .8,
			marginBottom: 'calc(var(--fs) / 2)',
			lineHeight: 1.2,
			fontFamily: 'serif, Times New Roman',
		}
	}
})
const $Other_details = styled('article')({
	p: {
		a: {
			marginRight: 'var(--fs)',
			fontSize: 'var(--fs-sm)',
		}
	}
})
