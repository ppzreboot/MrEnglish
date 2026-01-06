import { css } from 'goober'
import { $S } from '@biz/c/superfine'
import type { I_voc__list_opts } from '@biz/common/api'
import { Sort_input } from './input/sort.ts'
import { Star_input } from './input/star.ts'

export
interface I_header_opts {
	query_opts: I_voc__list_opts
	multi_select: boolean
}

export
function Header(opts: I_header_opts) {
	return $Cont({}, [
		Sort_input(opts.query_opts.sort),
		Star_input({
			val: opts.query_opts.star,
			set: nv => {
				opts.query_opts.star = nv
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
