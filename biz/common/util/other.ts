export
function assert(cond: boolean, msg: string) {
	if (!cond)
		throw Error('assert failed: ' + msg)
}

export
const sleep = (ms: number) =>
	new Promise(resolve => setTimeout(resolve, ms))
