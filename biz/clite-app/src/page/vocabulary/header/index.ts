import { css } from 'goober'
import { $S } from '@biz/c/superfine'
import { Sort_input } from './input/sort.ts'
import { Star_input } from './input/star.ts'

export
function Header() {
	return $Cont({}, [
		Sort_input(),
		Star_input(),
	])
}

const $Cont = $S('div', css({
	display: 'flex',
	alignItems: 'center',
	gap: '1em',
	fontSize: 'var(--fs-sm)',
}))
