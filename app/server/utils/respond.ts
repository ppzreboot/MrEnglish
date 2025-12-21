export
const respond_html = (html: string) =>
	new Response(html, {
		headers: {
			'Content-Type': 'text/html',
			'Cache-Control': 'private, max-age=0',
		}
	})
