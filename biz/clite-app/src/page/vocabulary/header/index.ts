import { text, h, $S } from '@biz/c/superfine'
import { css } from 'goober'
import type { I_voc__list_opts } from '@biz/common/api'
import { Sort_input } from './sort-input.ts'

export
interface I_header_opts {
	query_opts: I_voc__list_opts
	multi_select: boolean
}

export
function Header(opts: I_header_opts) {
	return $Cont({}, [
		Sort_input(opts.query_opts.sort),
	])
}

const $Cont = $S('div', css({
	display: 'flex',
	alignItems: 'center',
	gap: '2em',
	fontSize: 'var(--fs-sm)',
}))
