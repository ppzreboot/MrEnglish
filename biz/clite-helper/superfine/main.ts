import { type I_vnode, patch } from './_superfine.ts'

let _redraw: () => void

export
const super_main = <Opts>(Page: (opts: Opts) => () => I_vnode) =>
	(root: HTMLDivElement, opts: Opts) => {
		const _Page = Page(opts)
		_redraw = () => {
			patch(root, _Page())
		}
		redraw()
	}

export
const redraw = () => _redraw()
