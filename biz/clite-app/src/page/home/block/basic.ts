import { css } from 'goober'
import type { I_inflection_type } from '@ppz-ai/ecdict-common'
import { cns } from '@biz/common/util'
import { home_page_url } from '@biz/common/page'
import { I_lookup_result } from '@biz/common/entity'
import { Read_word, Read_word_with_web_speech } from '@biz/c/ui2'
import { get_voice_list } from '@biz/c/utils'
import { $S, h, redraw, text } from '@biz/c/superfine'

const inflection_label: Record<I_inflection_type, string> = {
  did: '过去式',
  done: '过去分词',
  ing: '进行时',
  does: '第三人称单数',
  er: '比较级',
  est: '最高级',
  s: '复数',
}

interface I_inf_item {
	label: string
	inf?: string
	is_lemma: boolean
}

export
const make__Basic_explain = (props: I_lookup_result) => {
	const mw = props.mw
	const prn_list = mw === null ? [] :
		mw
			.map(entry => entry.prs)
			.filter(prs => prs !== undefined)
			.flat()
			.map(Read_word)
	make__read_by_browser(props.ecdict.word).then(read_by_browser => {
		if (read_by_browser === null)
			return
		prn_list.push(Read_word_with_web_speech(read_by_browser))
		redraw()
	})

	const ecdict = props.ecdict
	// inflection (屈折变化)
	const inf_list = Object.entries(ecdict.inflection)
		.map<I_inf_item>(([label, inf]) => ({
			label: inflection_label[label as I_inflection_type],
			inf,
			is_lemma: false,
		}))
		.filter((item): item is Required<I_inf_item> =>
			item.inf !== undefined
		)
	if (ecdict.lemma !== null)
		inf_list.unshift({
			label: '原型',
			inf: ecdict.lemma.lemma,
			is_lemma: true,
		})

	return () =>
		$Basic_details({ className: 'main-content' }, [
			h('h5', {}, text('简明释义')),
			h('ul', { className: 'pronunciation-list' },
				prn_list.map(Read =>
					h('li', {},
						Read(),
					)
				)
			),
			h('ul', { className: 'txt-list' },
				ecdict.translation.map(d =>
					h('li', {},
						text(d)
					)
				)
			),
			inf_list.length > 0 &&
				h('ul', { className: 'inflection-list' },
					inf_list.map(item =>
						h('li', { key: item.label }, [
							h('label', {}, text(item.label)),
							h('a',
								{
									href: home_page_url(item.inf),
									className: cns('en-font', item.is_lemma && 'lemma')
								},
								text(item.inf),
							)
						])
					)
				)
			,
		])
}

const $Basic_details = $S('article', css({
	'.pronunciation-list': {
		marginBottom: 'var(--fs)',
		display: 'flex',
		flexWrap: 'wrap',
		gap: 'var(--fs)',
	},
	'.inflection-list': {
		display: 'flex',
		flexWrap: 'wrap',
		columnGap: 'var(--fs)',
		label: {
			fontSize: 'var(--fs-sm)',
			opacity: .6,
			marginRight: '.4em',
		},
		'a:not(.lemma)': {
			color: 'inherit',
		},
	}
}))

const make__read_by_browser = async (word: string) => {
	if (globalThis.speechSynthesis === undefined)
		return null
	const voice_list = await get_voice_list()
	if (voice_list === null || voice_list.length === 0)
		return null
	const en_list = voice_list.filter(v => v.lang === 'en-US')
	const voice =
		// en_list.find(v =>
		// 	v.voiceURI === 'Microsoft Ava Online (Natural) - English (United States)'
		// )
		en_list.find(v =>
			v.voiceURI === 'Samantha'
		)
		|| en_list[0]

	const utterance = new SpeechSynthesisUtterance(word)
	utterance.voice = voice
	utterance.rate = .7
	return {
		play() {
			speechSynthesis.speak(utterance)
		},
		stop() {
			speechSynthesis.cancel()
		},
		on_end(end: () => void) {
			utterance.addEventListener('end', end)
		},
	}
}
