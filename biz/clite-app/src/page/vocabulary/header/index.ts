import { css } from 'goober'
import { $S } from '@biz/c/superfine'
import { voc_api as api } from '@biz/common/api'
import { Sort_input } from './input/sort.ts'
import { Star_input } from './input/star.ts'

export
function Header(opts: {
	list_opts: api.I_list_opts
	multi_select: boolean
}) {
	return $Cont({}, [
		Sort_input(opts.list_opts.sort),
		Star_input({
			val: opts.list_opts.star,
			set: nv => {
				opts.list_opts.star = nv
			},
		})
	])
}

const $Cont = $S('div', css({
	display: 'flex',
	alignItems: 'center',
	gap: '1em',
	fontSize: 'var(--fs-sm)',
}))
