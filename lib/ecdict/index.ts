import { Database } from 'better-sqlite3'
import { I_lookup_from_ECDICT, I_ecdict_raw } from './type'
import { format } from './format'

export
function ecdict_sqlite3(db: Database): I_lookup_from_ECDICT {
	const stmt = db.prepare('select * from stardict where word=?')
	return async function lookup_from_ecdict(word) {
		if (word.length > 100 || word.length === 0)
			return null
		const result = await stmt.get(word) as I_ecdict_raw
		return result ? format(result) : null // 相信数据库
	}
}
