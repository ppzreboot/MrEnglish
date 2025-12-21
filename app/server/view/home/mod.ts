import { I_lookup_result } from '@mr-english/schema'
import { I_formatted_meriam_webster_entry } from '@mr-english/meriam-webster'
import { pages } from '../_inner/meta.ts'
import { simple_page } from '../_inner/layout.ts'
import { html } from '../_inner/util.tsx'

export
const home_page = (opts?: {
  word: string,
  star: boolean,
  lookup_result: null | I_lookup_result,
}) =>
	simple_page(pages.home, html`
    <div class="page home">
      <div
        class="main-content main-input"
        data-word="${opts && opts.word}"
      ></div>
      ${opts && html`
				<div class='lookup-result'>
          ${opts.lookup_result && html`
						basic explain
						${opts.lookup_result.mw &&
							EE_explain(opts.lookup_result.mw)
						}
					`}
          ${other_explain(opts.word)}
        </div>`
      }
    </div>
	`)

const EE_explain = (mw: I_formatted_meriam_webster_entry[]) =>
	`<article class='main-content e2e'>
			<h5>英英释义</h5>
			${mw.map(entry =>
				`<div key={index} class='entry'>
					<h5 class="fl">${entry.fl ?? '??'}</h5>
					<ul class='list'>
						${entry.shortdef.map(def =>
							`<li class='txt-item'>
								<div title="${def}"}>
									${def}
								</div>
							</li>`
						)}
					</ul>
				</div>`
			)}
	</article>`

const other_explain = (word: string) =>
  `<article class="main-content other-dict">
		<h5>其他字典</h5>
		<p>
			<a target='_blank'
        href="https://youdao.com/result?lang=en&word=${word}"
      >有道词典</a>
			<a target='_blank'
        href="https://dict.eudic.net/dicts/en/${word}"
      >欧路词典</a>
			<a target='_blank'
        href="https://translate.google.com/?sl=en&tl=zh-CN&text=${word}&op=translate"
      >谷歌翻译</a>
		</p>
	</article>`
