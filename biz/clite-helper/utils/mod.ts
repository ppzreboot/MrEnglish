export
function get_voice_list() {
	const list = globalThis.speechSynthesis.getVoices()
	if (list.length > 0) {
		console.log('获取声音列表时，未等待')
		return Promise.resolve(list)
	}
	const start = Date.now()
	return new Promise<null | SpeechSynthesisVoice[]>(resolve => {
		let finished = false
		globalThis.speechSynthesis.onvoiceschanged = () => {
			if (finished)
				return
			finished = true
			resolve(globalThis.speechSynthesis.getVoices())
			console.log('获取声音列表时，等待了', Date.now() - start, 'ms')
		}
		setTimeout(() => {
			if (finished)
				return
			finished = true
			resolve(null)
			console.log('获取声音列表超时')
		}, 500)
	})
}
