import { randomBytes, scrypt, type BinaryLike } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt_async = promisify(scrypt)
const SALT_LEN = 16
const KEY_LEN = 64

export
async function hash_password(plain: string): Promise<string> {
	const salt = randomBytes(SALT_LEN)
	const derived = await scrypt_async(plain as BinaryLike, salt, KEY_LEN) as Buffer
	return `${salt.toString('hex')}:${derived.toString('hex')}`
}

export
async function verify_password(plain: string, stored: string): Promise<boolean> {
	const [salt_hex, key_hex] = stored.split(':')
	if (!salt_hex || !key_hex) return false
	const salt = Buffer.from(salt_hex, 'hex')
	if (salt.length !== SALT_LEN) return false
	const derived = await scrypt_async(plain as BinaryLike, salt, KEY_LEN) as Buffer
	const expected = derived.toString('hex')
	return key_hex === expected
}
