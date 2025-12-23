import type { I_ecdict, I_inflection_type } from '@ppz-ai/ecdict-common'
import { h } from '../_inner/interpolation.ts'

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
function basic_explain(ecdict: I_ecdict) {
  const inf_list = Object.entries(ecdict.inflection)
    .filter(([_, v]) => v)
    .map(([k, v]) => [
      inflection_label[k as I_inflection_type],
      v,
    ])
  return h`
		<article class='main-content basic'>
			<h5>简明释义</h5>
			<ul class='pronunciation-list'></ul>

			<ul class='list'>
				${ecdict.translation.map(item =>
					h`<li class='txt-item'>${item}</li>`
				)}
			</ul>

			${(inf_list.length || ecdict.lemma) &&
				h`<ul class='txt-item inflection-list'>
					${ecdict.lemma &&
						h`<li>
							<label>原型</label>
							<a href="/?q=${ecdict.lemma.lemma}">
								<span class='en-font'>${ecdict.lemma.lemma}</span>
							</a>
						</li>`
					}
					${inf_list.map(([k, v]) =>
						`<li>
							<label>${k}</label>
							<span class='en-font'>${v}</span>
						</li>`
					)}
				</ul>`
			}
		</article>`
}
