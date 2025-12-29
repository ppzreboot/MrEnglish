import { type ReactNode, StrictMode, createElement } from 'react'
import { setup } from 'goober'
import { createRoot } from 'react-dom/client'

setup(createElement) // !!!

export
const Simple_main = <I_page_opts,>(Page: (props: { opts: I_page_opts }) => ReactNode) =>
	(node: HTMLDivElement, opts: I_page_opts) =>
		createRoot(node).render(
			<StrictMode>
				<Page opts={opts} />
			</StrictMode>
		)
