export
const sort_map: Record<'asc' | 'desc', '$gt' | '$lt'> = {
	asc: '$gt',
	desc: '$lt',
}

export
const order_map: Record<'asc' | 'desc', 1 | -1> = {
	asc: 1,
	desc: -1,
}
