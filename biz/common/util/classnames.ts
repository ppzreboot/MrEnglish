type I_maybe_classname = false | null | undefined | 0 | string

export
const cns = (...classnames: I_maybe_classname[]) =>
	classnames.filter(Boolean).join(' ')
