import { is_letter } from '@biz/common/util'

interface I_maybe_word {
	is_word: boolean
	val: string
}

// 识别一长串字符串中的“单词”，还不支持 aren't, can't 这种
// https://chatgpt.com/c/693441dc-3d58-8322-877d-ed09810cb2b4
export
function identify_word(text: string) {
	// 下面的每次循环，都要确认此三个对象的变化
	const list: I_maybe_word[] = []
	let current_str = text[0]
	let status: 'word' | 'non-word' | 'word-dash'
		= is_letter(current_str) ? 'word' : 'non-word'

	for (let i=1; i<text.length; i++) {
		if (is_letter(text[i])) {
			switch(status) {
				case 'word':
				case 'word-dash':
					current_str += text[i]
					continue
				case 'non-word':
					list.push({
						is_word: false,
						val: current_str,
					})
					status = 'word'
					current_str = text[i]
					continue
			}
		} else if (text[i] === '-') {
			switch(status) {
				case 'word':
					status = 'word-dash'
					current_str += text[i]
					continue
				case 'non-word':
					current_str += '-'
					continue
				case 'word-dash':
					list.push({
						is_word: true,
						val: current_str.slice(0, -1),
					})
					status = 'non-word'
					current_str = '--'
					continue
			}
		} else { // text[i] 非字母、'-'
			switch(status) {
				case 'non-word':
					current_str += text[i]
					continue
				case 'word':
					list.push({
						is_word: true,
						val: current_str
					})
					status = 'non-word'
					current_str = text[i]
					continue
				case 'word-dash':
					list.push({
						is_word: true,
						val: current_str.slice(0, -1)
					})
					current_str = '-' + text[i]
					status = 'non-word'
					continue
			}
		}
	}

	switch(status) {
		case 'word':
			list.push({ is_word: true, val: current_str })
			break
		case 'word-dash':
			list.push({ is_word: true, val: current_str.slice(0, -1) })
			list.push({ is_word: false, val: '-' })
			break
		case 'non-word':
			list.push({ is_word: false, val: current_str })
			break
	}
	return list
}
