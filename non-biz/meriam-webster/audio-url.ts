// 规则参考 https://www.dictionaryapi.com/products/json 搜索 "/audio/prons/[language_code]"

export
function make_audio_url(filename: string, format: 'mp3' | 'wav' | 'ogg' = 'ogg') {
	const sub_dir = filename.startsWith('bix') ? 'bix'
		: filename.startsWith('gg') ? 'gg'
		: is_alpha(filename) ? filename[0]
		: 'number'
	return `https://media.merriam-webster.com/audio/prons/en/us/${
		format}/${sub_dir}/${filename}.${format}`
}

function is_alpha(char: string) {
	return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z'
}
