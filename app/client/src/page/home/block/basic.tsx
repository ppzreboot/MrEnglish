import { Read_word } from '@mr-english-client/ui'
import { I_formatted_meriam_webster_prs } from '@mr-english/meriam-webster'
import type { I_inflection_type } from '@ppz-ai/ecdict-common'
import { I_lookup_result } from '@mr-english/schema'

const inflection_label: Record<I_inflection_type, string> = {
  did: '过去式',
  done: '过去分词',
  ing: '进行时',
  does: '第三人称单数',
  er: '比较级',
  est: '最高级',
  s: '复数',
}

export
function Basic_explain(props: {
	lookup_result: I_lookup_result
}) {
	const { ecdict, mw } = props.lookup_result
  // 音标与读音
  const read_list = mw === undefined ? [] :
    mw.flatMap(entry => entry.prs)
      .filter(prns => prns) as I_formatted_meriam_webster_prs[]

  const inf_list = Object.entries(ecdict.inflection)
    .filter(([_, v]) => v)
    .map(([k, v]) => [
      inflection_label[k as I_inflection_type],
      v,
    ])
  return <article className='main-content basic'>
		<h5>简明释义</h5>

		{Boolean(read_list.length) &&
			<ul className='pronunciation-list'>
				{read_list.map((prn, i) =>
					<li key={i}>
						<Read_word {...prn} />
					</li>
				)}
			</ul>
		}
		<ul className='list'>
			{ecdict.translation.map(item =>
				<li key={item} className='txt-item'>{item}</li>
			)}
		</ul>
		{(Boolean(inf_list.length) || ecdict.lemma) &&
			<ul className='txt-item inflection-list'>
				{ecdict.lemma &&
					<li>
						<label>原型</label>
						<a href={'./?q=' + ecdict.lemma.lemma}>
							<span className='en-font'>{ecdict.lemma.lemma}</span>
						</a>
					</li>
				}
				{inf_list.map(([k, v]) =>
					<li key={k}>
						<label>{k}</label>
						<span className='en-font'>{v}</span>
					</li>
				)}
			</ul>
		}
	</article>
}