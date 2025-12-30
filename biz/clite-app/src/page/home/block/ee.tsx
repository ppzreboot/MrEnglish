import { styled } from 'goober'
import { En_p } from '@biz/c/ui'

export
const EE_explain = (props: { list: {
	fl: string
	shortdef: string[]
}[] }) =>
	<$EE_details className='main-content'>
		{props.list.map((entry, index) =>
			<div key={index} className='entry'>
				<h5 className='fl'>
					{entry.fl}
				</h5>
				<ul className='txt-list'>
					{entry.shortdef.map(def =>
						<li key={def}>
							<div title={def}>
								<En_p text={def} />
							</div>
						</li>
					)}
				</ul>
			</div>
		)}
	</$EE_details>

const $EE_details = styled('article')({
	'.entry': {
		'&:not(:last-child)': {
			marginBottom: 'var(--fs)',
		},
		'h5.fl': {
			opacity: .8,
			marginBottom: 'calc(var(--fs) / 2)',
			lineHeight: 1.2,
			fontFamily: 'serif, Times New Roman',
		}
	}
})
