import { styled } from 'goober'

export
const Other_explain = (props: { word: string }) =>
	<$Other_explain className='main-content'>
		<h5>其他字典</h5>
		<p>
			<a href={'https://youdao.com/result?lang=en&word=' + props.word} target='_blank'>有道词典</a>
			<a href={'https://dict.eudic.net/dicts/en/' + props.word} target='_blank'>欧路词典</a>
			<a href={`https://translate.google.com/?sl=en&tl=zh-CN&text=${props.word}&op=translate`} target='_blank'>谷歌翻译</a>
		</p>
	</$Other_explain>

const $Other_explain = styled('article')({
	p: {
		a: {
			color: 'inherit',
			fontWeight: 500,
			opacity: .8,
			marginRight: 'var(--fs)',
			fontSize: 'var(--fs-sm)',
			'&:hover': {
				opacity: 1,
			},
		}
	}
})
