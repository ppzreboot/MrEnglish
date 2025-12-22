import { I_lookup_result } from '@mr-english/schema'
import { I_formatted_meriam_webster_entry } from '@mr-english/meriam-webster'
import { pages } from '../_inner/meta.ts'
import { simple_page } from '../_inner/layout.ts'
import { h, s } from '../_inner/interpolation.ts'
import { basic_explain } from './basic.ts'

type I_opts
	= null // 获取页面，不查单词
	| { // 没查到单词
		word: string
		lookup_result: null
		record: null
	}
	| { // 查到单词
		word: string
		lookup_result: I_lookup_result
		record: { // 查询记录
			id: string
			star: boolean
		}
	}

export
const home_page = (opts: I_opts) => {
	const clite_data = opts && {
		word: opts.word,
		valid_ecdict: opts.lookup_result !== null,
		record: opts.record,
	}
	return simple_page(pages.home,
		h`
			<div class="page home">
				<div class="main-input main-content"></div>
				${opts && h`
					<div class='lookup-result'>
						${opts.lookup_result && [
							basic_explain(opts.lookup_result),
							opts.lookup_result.mw &&
								EE_explain(opts.lookup_result.mw)
						]}
						${other_explain(opts.word)}
					</div>`
				}
			</div>
			<script>
				document.addEventListener('DOMContentLoaded', () => {
					CLITE.home_page(${s(JSON.stringify(clite_data))})
				})
			</script>
		`,
	)
}

const EE_explain = (mw: I_formatted_meriam_webster_entry[]) =>
	h`<article class='main-content e2e'>
			<h5>英英释义</h5>
			${mw.map(entry =>
				h`<div key={index} class='entry'>
					<h5 class="fl">${s(entry.fl)}</h5>
					<ul class='list'>
						${entry.shortdef.map(def =>
							h`<li class='txt-item'>
								${s(def)}
							</li>`
						)}
					</ul>
				</div>`
			)}
	</article>`

const other_explain = (word: string) =>
  h`<article class="main-content other-dict">
		<h5>其他字典</h5>
		<p>
			<a target='_blank'
        href="https://youdao.com/result?lang=en&word=${s(word)}"
      >有道词典</a>
			<a target='_blank'
        href="https://dict.eudic.net/dicts/en/${s(word)}"
      >欧路词典</a>
			<a target='_blank'
        href="https://translate.google.com/?sl=en&tl=zh-CN&text=${s(word)}&op=translate"
      >谷歌翻译</a>
		</p>
	</article>`
