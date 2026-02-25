import './index.css'

/** 此页面用于展示无 superfine 时的页面逻辑 */

export
function main() {
	console.log('hello, this is a demo page')

	const form = document.querySelector('form')!
	let submitting = false
	form.addEventListener('submit', async e => {
		e.preventDefault()
		if (submitting) return
		submitting = true

		const data = new FormData(form)
		const title = data.get('title') as string
		const char_setting = data.get('char_setting') as string
		const response = await fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({
				title,
				char_setting,
			}),
		})
		const json = await response.json()
		if (json.error) {
			alert('unknown error')
			return
		}
	})
}
