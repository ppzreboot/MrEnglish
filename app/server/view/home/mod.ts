import { I_lookup_record, I_lookup_result, I_page_opts__home } from '@mr-english/schema'
import { simple_page } from '../_inner/layout.ts'
import { h } from '../_inner/interpolation.ts'
import { basic_explain } from './basic.ts'

type I_render_opts = {
	type: 'empty'
} | {
	type: 'word not found'
	word: string
} | {
	type: 'normal'
	word: string
	record: I_lookup_record
	lookup_result: I_lookup_result
}

export
const home_page = (opts: I_render_opts) =>
	simple_page('home', r2p(opts),
		h`
			<div class="page home">
				<div class="main-input main-content"></div>
				${opts.type !== 'empty' && h`
					<div class='lookup-result'>${[
						opts.type === 'normal' && [
							basic_explain(opts.lookup_result.ecdict),
							opts.lookup_result.mw &&
								`<article class='main-content e2e'>
									<h5>英英释义</h5>
									<div class="entries"></div>
								</article>`
						],
						other_explain(opts.word),
					]}</div>`
				}
			</div>
		`,
	)

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

/** render opts (on server) to init opts (on clite) */
function r2p(opts: I_render_opts): I_page_opts__home {
	switch (opts.type) {
		case 'empty':
			return { type: 'empty' }
		case 'word not found':
			return { type: 'word not found', word: opts.word }
		case 'normal':
			return {
				type: 'normal',
				word: opts.word,
				record: opts.record,
				ee_entry_list: opts.lookup_result?.mw?.map(entry => ({
					fl: entry.fl,
					shortdef: entry.shortdef,
				})) || null
			}
	}
}
