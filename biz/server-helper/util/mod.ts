import { ObjectId } from 'mongodb'

export
function str2obj_id(str: string) {
	try {
		return new ObjectId(str)
	} catch {
		return null
	}
}
