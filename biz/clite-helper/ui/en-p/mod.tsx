import { Fragment, useMemo, type ReactNode } from 'react'
import { identify_word } from './identify-word.ts'
import { make_route__home } from '@mr-english-client/biz'

/** English Paragraph */
export
function En_p(props: { text: string }): ReactNode {
	return useMemo(() =>
		identify_word(props.text)
			.map((maybe_word, index) =>
				<Fragment key={index}>
					{maybe_word.is_word
						? <a
								href={make_route__home(maybe_word.val)}
								style={{
									color: 'inherit',
								}}
							>{maybe_word.val}</a>
						: maybe_word.val
					}
				</Fragment>
			)
	, [props.text])
}
