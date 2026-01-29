import { home_page_url } from '@biz/common/page'
import { h, text } from '#/superfine/mod.ts'
import { identify_word } from './identify-word.ts'

/** English Paragraph */
export
const FP__En_p = (p: string) =>
	identify_word(p)
		.map(maybe_word =>
			maybe_word.is_word
				? h('a', { href: home_page_url(maybe_word.val) },
						text(maybe_word.val)
					)
				: text(maybe_word.val)
		)
