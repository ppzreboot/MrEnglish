import { css } from 'goober'
import { $S, h, text } from '@biz/c/superfine'

export
const Other_explain = (word: string) =>
	$Other_explain({ className: 'main-content' }, [
		h('h5', {}, text('其他字典')),
		h('p', {}, [
			h('a',
				{
					href: 'https://youdao.com/result?lang=en&word=' + word,
					target: '_blank',
				},
				text('有道词典'),
			),
			h('a',
				{
					href: 'https://dict.eudic.net/dicts/en/' + word,
					target: '_blank',
				},
				text('欧路词典'),
			),
			h('a',
				{
					href: `https://translate.google.com/?sl=en&tl=zh-CN&text=${word}&op=translate`,
					target: '_blank',
				},
				text('谷歌翻译'),
			),
		])
	])

const $Other_explain = $S('article', css({
	p: {
		a: {
			// color: 'inherit',
			// fontWeight: 500,
			opacity: .8,
			marginRight: 'var(--fs)',
			fontSize: 'var(--fs-sm)',
			'&:hover': {
				opacity: 1,
			},
		}
	}
}))
