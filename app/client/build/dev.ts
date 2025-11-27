/// <reference lib="deno.unstable" />
/// <reference lib="deno.ns" />

import { copy } from '@std/fs'

await Deno.remove('./dist', { recursive: true })
await copy('./public', './dist')

const result = await Deno.bundle({
	entrypoints: ['index.html'],
	outputDir: 'dist',
	format: 'esm',
	platform: 'browser',
	sourcemap: 'inline',
})

console.log(`%cbundle result: ${result.success ? 'success' : 'failed'}`, 'color: #00f')
