export * from './main.ts'
export * from './styled.ts'
export * from './_superfine.ts'

export
interface I_value<V> {
	val: V
	set: (next: V) => void
}
