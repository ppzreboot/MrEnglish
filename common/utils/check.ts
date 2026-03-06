export
function is_email(email: string) {
	const r = /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i
	return r.test(email)
}

export
const email_code_length = 6
