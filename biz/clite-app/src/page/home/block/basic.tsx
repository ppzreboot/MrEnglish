import { styled } from 'goober'
import type { I_inflection_type } from '@ppz-ai/ecdict-common'
import { cns } from '@biz/common/util'
import { home_page_url } from '@biz/common/page'
import { I_lookup_result } from '@biz/common/entity'
import { Read_word } from '@biz/c/ui'

const inflection_label: Record<I_inflection_type, string> = {
  did: '过去式',
  done: '过去分词',
  ing: '进行时',
  does: '第三人称单数',
  er: '比较级',
  est: '最高级',
  s: '复数',
}

interface I_inf_item {
	label: string
	inf?: string
	is_lemma: boolean
}

export
const Basic_explain = (props: I_lookup_result) => {
	const ecdict = props.ecdict
	const inf_list = Object.entries(ecdict.inflection)
		.map<I_inf_item>(([label, inf]) => ({
			label: inflection_label[label as I_inflection_type],
			inf,
			is_lemma: false,
		}))
		.filter((item): item is Required<I_inf_item> =>
			item.inf !== undefined
		)
	if (ecdict.lemma !== null)
		inf_list.unshift({
			label: '原型',
			inf: ecdict.lemma.lemma,
			is_lemma: true,
		})

	const mw = props.mw
	const prn_list = mw === null ? [] :
		mw
			.map(entry => entry.prs)
			.filter(prs => prs !== undefined)
			.flat()
	return <$Basic_details className='main-content'>
		<h5>简明释义</h5>
		{prn_list.length > 0 &&
			<ul className='pronunciation-list'>
				{prn_list.map((prn, index) =>
					<li key={index}>
						<Read_word {...prn} />
					</li>
				)}
			</ul>
		}
		<ul className='txt-list'>
			{ecdict.translation.map(d =>
				<li key={d}>
					{d}
				</li>
			)}
		</ul>
		{inf_list.length > 0 &&
			<ul className='inflection-list'>
				{inf_list.map(item =>
					<li key={item.label}>
						<label>{item.label}</label>
						<a href={home_page_url(item.inf)}
							className={cns('en-font', item.is_lemma && 'lemma')}
						>
							{item.inf}
						</a>
					</li>
				)}
			</ul>
		}
	</$Basic_details>
}

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
		},
		'a:not(.lemma)': {
			color: 'inherit',
		},
	}
})
