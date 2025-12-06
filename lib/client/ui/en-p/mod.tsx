import { Fragment, useMemo, type ReactNode } from 'react'
import { identify_word } from './identify-word.ts'

/** English Paragraph */
export
function En_p(props: { text: string }): ReactNode {
	return useMemo(() =>
		identify_word(props.text)
			.map((maybe_word, index) =>
				<Fragment key={index}>
					{maybe_word.is_word
						? <a
								href={'/?q=' + maybe_word.val}
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
