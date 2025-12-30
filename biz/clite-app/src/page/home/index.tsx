import { type I_page_opts__home } from '@biz/common/page'
import { Simple_main } from '@biz/c/main'
import { Layout } from '@biz/c/ui'

import { Basic_explain } from './block/basic.tsx'
import { Main_input } from './input.tsx'
import { Other_explain } from './block/other.tsx'
import { EE_explain } from './block/ee.tsx'

export
const main = Simple_main<I_page_opts__home>(props =>
	<Layout>
		<Main_input {...props.opts} />
		<div>
			{props.opts.type !== 'empty' && <>
				{props.opts.type === 'normal' && <>
					<Basic_explain {...props.opts.result} />
					{props.opts.result.mw !== null &&
						<EE_explain list={props.opts.result.mw} />
					}
					</>
				}
				<Other_explain word={props.opts.word} />
			</>}
		</div>
	</Layout>
)

