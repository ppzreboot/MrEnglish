import { I_formatted_meriam_webster_entry } from '@mr-english/meriam-webster'
import { En_p } from '@mr-english-client/ui'

export
function EE_explain(props: {
	mw: I_formatted_meriam_webster_entry[]
}) {
  return <article className='main-content e2e'>
			<h5>英英释义</h5>
			{props.mw.map((entry, index) =>
				<div key={index} className='entry'>
				{entry.fl &&
					<h5 className='fl'>{entry.fl}</h5>
				}
				<ul className='list'>
					{entry.shortdef.map(def =>
						<li key={def} className='txt-item'>
							<div title={def}>
								<En_p text={def} />
							</div>
						</li>
					)}
				</ul>
			</div>
		)}
	</article>
}
