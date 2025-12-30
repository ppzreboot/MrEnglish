import { styled } from 'goober'
import type { I_inflection_type } from '@ppz-ai/ecdict-common'
import { home_page_url, type I_page_opts__home } from '@biz/common/page'
import { I_lookup_result } from '@biz/common/entity'
import { Read_word, Layout } from '@biz/c/ui'
import { Simple_main } from '@biz/c/main'

import { Main_input } from './input.tsx'

const inflection_label: Record<I_inflection_type, string> = {
  did: '过去式',
  done: '过去分词',
  ing: '进行时',
  does: '第三人称单数',
  er: '比较级',
  est: '最高级',
  s: '复数',
}

const Basic_explain = (props: I_lookup_result) => {
	const ecdict = props.ecdict
	const inf_list = Object.entries(ecdict.inflection)
		.map(([label, inf]) => ({
			label: inflection_label[label as I_inflection_type],
			inf,
		}))
		.filter((item): item is { label: string, inf: string } =>
			item.inf !== undefined
		)
	if (ecdict.lemma !== null)
		inf_list.push({ label: '原型', inf: ecdict.lemma.lemma })

	const mw = props.mw
	const prn_list = mw === null ? [] :
		mw
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
		<ul className='txt-list'>
			{ecdict.translation.map(d =>
				<li key={d}>
					{d}
				</li>
			)}
		</ul>
		{inf_list.length &&
			<ul className='inflection-list'>
				{inf_list.map(item =>
					<li key={item.label}>
						<label>{item.label}</label>
						<a href={home_page_url(item.inf)} className='en-font'>
							{item.inf}
						</a>
					</li>
				)}
			</ul>
		}
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
