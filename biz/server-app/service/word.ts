import { Filter, ObjectId, WithId } from 'mongodb'
import { I_app_db, I_service__lookup, I_service__word } from '@biz/s/schema'
import { I_doc__vocabulary } from '@biz/common/entity'
import { sort_map, order_map } from '#/utils/mongo.ts'

export
function init_service__word_mng(app_db: I_app_db, lookup: I_service__lookup): I_service__word {
	async function add_vocabulary(userid: ObjectId, word: string) {
		const now = new Date()
		await app_db.vocabulary.updateOne(
			{ word, userid },
			{
				$set: {
					last_lookup_at: now,
				},
				$setOnInsert: {
					star: false,
					first_lookup_at: now,
				},
			},
			{ upsert: true },
		)
	}
	return {
		async add_vocabulary_and_get_star(userid, word) {
			await add_vocabulary(userid, word)
			const doc = await app_db.vocabulary.findOne({ word, userid })
			return {
				id: doc!._id.toString(),
				star: doc!.star,
			}
		},
		async star(word_oid, userid, star) {
			const count = await app_db.vocabulary.updateOne({ _id: word_oid, userid }, {
				$set: { star }
			})
			if (count.matchedCount !== 1)
				throw Error(`staring word: not found for user ${userid}`)
		},
		async is_in_ecdict(word) {
			return null !== await lookup.ecdict(word)
		},
		get_vocabulary: async (userid, limit, opts) => {
			const filter: Filter<I_doc__vocabulary<ObjectId, Date>> = {
				userid,
			}
			if (opts.star !== undefined)
				filter.star = opts.star
			if (opts.last_page !== undefined) {
				const last = await app_db.vocabulary.findOne({
					_id: new ObjectId(opts.last_page)
				}) as WithId<I_doc__vocabulary<ObjectId, Date>>
				if (opts.sort.key === 'alphabet')
					filter.word = {
						[sort_map[opts.sort.order]]: last.word,
					}
				else // type === 'include-time'
					filter.$or = [
 						// 或: 大于“上页最后一条”
						{
							last_lookup_at: {
								[sort_map[opts.sort.order]]: last.last_lookup_at,
							},
						},
						// 或: 等于“上页最后一条”，但 _id 更大
						{
							last_lookup_at: last.first_lookup_at,
							_id: {
								[sort_map[opts.sort.order]]: last._id,
							},
						},
					]
			}
			const order_key = order_map[opts.sort.order]
			return await app_db.vocabulary
				.find(filter)
				.sort({
					[opts.sort.key === 'alphabet'
						? 'word'
						: 'last_lookup_at'
					]: order_key,
					_id: order_key,// 要把 id 放后头
				})
				.limit(limit)
				.toArray()
		},
	}
}
