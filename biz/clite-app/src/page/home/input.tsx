import { useState } from 'react'
import { styled } from 'goober'
import { home_page_url, type I_lookup_record, type I_page_opts__home } from '@biz/common/page'
import { is_valid_en_phrase, cns } from '@biz/common/util'
import { SVG__star, SVG__search } from '@biz/c/ui'

type I_state = {
	type: 'empty'
	current_input: string
	compositing: boolean
} | {
	type: 'not found'
	current_input: string
	compositing: boolean

	last_input: string
} | {
	type: 'normal'
	current_input: string
	compositing: boolean

	last_input: string

	word_record: I_lookup_record
	starring: boolean
}

function init_state(opts: I_page_opts__home): I_state {
	switch (opts.type) {
		case 'empty':
			return {
				type: 'empty',
				current_input: '',
				compositing: false,
			}
		case 'not found':
			return {
				type: 'not found',
				current_input: opts.word,
				compositing: false,
				last_input: opts.word,
			}
		case 'normal':
			return {
				type: 'normal',
				current_input: opts.word,
				compositing: false,
				last_input: opts.word,
				word_record: opts.record,
				starring: false,
			}
	}
}

export
const Main_input = (props: I_page_opts__home) => {
	const [state, set_state] = useState(() =>
		init_state(props)
	)
	const current_input = state.current_input.trim()
	const disabled_lookup = current_input.length === 0

	return <$Main_input className='main-content'>
		<input
			placeholder='输入单词'
			autoFocus={state.type === 'empty'}
			value={state.current_input}
			onChange={evt => {
				set_state(s => ({
					...s,
					current_input: evt.target.value,
				}))
			}}
			onCompositionStart={() => {
				set_state(s => ({
					...s,
					compositing: true,
				}))
			}}
			onCompositionEnd={() => {
				set_state(s => ({
					...s,
					compositing: false,
				}))
			}}
			onKeyDown={evt => {
				if (!state.compositing && evt.key === 'Enter')
					go()
			}}
		/>

		{state.type === 'normal' && current_input === state.last_input
			? <button
					className='icon-btn'
					style={{
						color: state.word_record.star ? '#eac54f' : undefined
					}}
					disabled={disabled_lookup}
					onClick={async () => {
						// 这里可以忽略 “请求期间的状态变化”，把该 disabled 的 disable 掉
						set_state({
							...state,
							starring: true,
						})
						await fetch(`/api/star?word=${
							state.word_record.id}&star=${state.word_record.star ? 0 : 1}`)
						set_state({
							...state,
							word_record: {
								id: state.word_record.id,
								star: !state.word_record.star,
							},
							starring: false,
						})
					}}
				>
					<SVG__star fill={state.word_record.star} />
				</button>
			: <a
					className={cns('icon-btn', disabled_lookup && 'disabled')}
					href={home_page_url(current_input)}
					onClickCapture={evt => {
						if (disabled_lookup)
							evt.preventDefault()
					}}
				>
					<SVG__search />
				</a>
		}
	</$Main_input>

	function go() {
		if (is_valid_en_phrase(current_input))
			location.href = home_page_url(current_input)
		throw Error('invalid input')
	}
}

const $Main_input = styled('div')({
	display: 'flex',
	alignItems: 'center',
	gap: 'var(--fs)',

	input: {
		flex: 1,
		'@media (min-width: 600px)': {
			textAlign: 'center',
			fontSize: 'calc(var(--fs) * 2)',
			height: 'calc(var(--fs) * 3)',
		},
		'@media (max-width: 600px)': {
			height: 'calc(var(--fs-lg) * 1.5)',
		},
	},

	'.icon-btn': {
		fontSize: '1.5rem',
		'@media (max-width: 600px)': {
			fontSize: '1rem',
		},
	},
})
