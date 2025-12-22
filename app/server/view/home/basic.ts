import { I_formatted_meriam_webster_prs } from '@mr-english/meriam-webster'
import type { I_inflection_type } from '@ppz-ai/ecdict-common'
import { I_lookup_result } from '@mr-english/schema'
import { h, s } from '../_inner/interpolation.ts'

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
function basic_explain(lookup_result: I_lookup_result) {
	const { ecdict, mw } = lookup_result
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
  return h`
		<article class='main-content basic'>
			<h5>简明释义</h5>

			${Boolean(read_list.length) &&
				h`<ul class='pronunciation-list'>
					${read_list.map(prn =>
						h`<li
							data-ipa="${s(prn.ipa)}"
							data-prn="${s(prn.audio || '')}"
						></li>`
					)}
				</ul>`
			}

			<ul class='list'>
				${ecdict.translation.map(item =>
					h`<li class='txt-item'>${s(item)}</li>`
				)}
			</ul>

			${(Boolean(inf_list.length) || ecdict.lemma) &&
				h`<ul class='txt-item inflection-list'>
					${ecdict.lemma &&
						h`<li>
							<label>原型</label>
							<a href="/?q=${s(ecdict.lemma.lemma)}">
								<span class='en-font'>${s(ecdict.lemma.lemma)}</span>
							</a>
						</li>`
					}
					${inf_list.map(([k, v]) =>
						s(`<li>
							<label>${k}</label>
							<span class='en-font'>${v}</span>
						</li>`)
					)}
				</ul>`
			}
		</article>`
}
