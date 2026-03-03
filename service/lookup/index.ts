import 'dotenv/config'
import Database from 'better-sqlite3'
import { z } from 'zod'
import { ecdict_sqlite3 } from '#lib/ecdict'
import {
	type I_mw_error,
	type I_raw_mw_entry,
	lookup_from_mw,
	format_raw,
} from '#lib/meriam-webster'
import type { I_lookup_result } from '#common/entity'
import { db } from '#service/db'

const ecdict_sqlite3_path = process.env.ECDict_SQLITE3!
const MW_apikey = process.env.MW_apikey!

console.log('opening ecdict sqlite3 at', ecdict_sqlite3_path)
const lookup_from_ecdict = ecdict_sqlite3(
	new Database(ecdict_sqlite3_path, {
		readonly: true,
		fileMustExist: true,
	})
)

const lookup_promises = new Map<string, Promise<I_lookup_result | null>>()

export
function lookup(word: string): Promise<null | I_lookup_result> {
	let promise = lookup_promises.get(word)
	if (promise)
		return promise
	promise = _lookup(word).finally(() => lookup_promises.delete(word))
	lookup_promises.set(word, promise)
	return promise
}

async function _lookup(word: string): Promise<null | I_lookup_result> {
	const ecdict_result = await lookup_from_ecdict(word)
	if (ecdict_result === null) return null

	// 尝试从缓存读取
	const cached_mw_result = await db.mw_cache.findUnique({
		where: { key: word },
	})
	// 缓存中，有
	if (cached_mw_result !== null)
		return {
			ecdict: ecdict_result,
			mw: format_raw(word, cached_mw_result.content as I_raw_mw_entry[]),
		}

	// 缓存中，没有，就调用 meriam-webster API
	console.log('caching meriam webster word', word)
	const mw_result = await lookup_from_mw(MW_apikey, word)

	if (mw_result.error) { // 没查到
		console.log(`cache meriam-webster "${word}" as not found`)
		// “不存在”也是数据
		await db.mw_cache.create({ // 现在只允许单实例部署
			data: {
				key: word,
				content: mw_result.raw_body,
				valid: false,
			}
		})
		console.error(format_mw_error(word, mw_result))
		return { ecdict: ecdict_result, mw: null }
	}

	// 查到了
	console.log(`cache meriam-webster "${word}"`)
	await db.mw_cache.create({
		data: {
			key: word,
			content: mw_result.raw_body,
			valid: true,
		},
	})
	return {
		ecdict: ecdict_result,
		mw: format_raw(word, mw_result.raw_body as I_raw_mw_entry[]),
	}
}

function format_mw_error(word: string, err: I_mw_error) {
	if (err.type === 'not a word')
		return `meriam-webster error (${word}): ${err.raw_body}`
	return `meriam-webster error (${word}):
http status: ${err.response.status}
http status text: ${err.response.statusText}
zod error: ${z.prettifyError(err.zod_err)}
raw body: ${err.raw_body}
`
}
