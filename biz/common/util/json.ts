export
function safe_parse(raw: string) {
	try {
		return [true, JSON.parse(raw)]
	} catch(err) {
		return [false, err]
	}
}
