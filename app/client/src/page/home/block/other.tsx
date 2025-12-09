export
function Other_explain(props: { word: string }) {
	return <article className='main-content other-dict'>
		<h5>其他字典</h5>
		<p>
			<a href={'https://youdao.com/result?lang=en&word=' + props.word} target='_blank'>有道词典</a>
			<a href={'https://dict.eudic.net/dicts/en/' + props.word} target='_blank'>欧路词典</a>
			<a href={`https://translate.google.com/?sl=en&tl=zh-CN&text=${props.word}&op=translate`} target='_blank'>谷歌翻译</a>
		</p>
	</article>
}