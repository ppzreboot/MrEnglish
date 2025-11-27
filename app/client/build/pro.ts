/// <reference lib="deno.unstable" />
/// <reference lib="deno.ns" />

import { copy } from '@std/fs'

try {
	await Deno.remove('./dist', { recursive: true,  })
} catch {
	console.log('看起来是第一次前端打包')
}
await copy('./public', './dist')

const result = await Deno.bundle({
	entrypoints: ['index.html'],
	outputDir: 'dist',
	format: 'esm',
	platform: 'browser',
	// sourcemap: 'inline',
	minify: true,
})

console.log(`%cbundle result: ${result.success ? 'success' : 'failed'}`, 'color: #00f')
