import { patch } from 'superfine'
import type { VNode, I_tagname } from 'superfine'

let _redraw: () => void

export
const super_main = <Opts>(Page: (opts: Opts) => () => VNode<I_tagname>) =>
	(root: HTMLDivElement, opts: Opts) => {
		const _Page = Page(opts)
		_redraw = () => {
			patch(root, _Page())
		}
		redraw()
	}

export
const redraw = () => _redraw()
