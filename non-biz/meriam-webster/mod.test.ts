import { assert } from '@std/assert'
import { lookup_from_mw } from './mod.ts'

Deno.test('lookup_from_mw', async t => {
    const apikey = Deno.env.get('mw_apikey')
    assert(apikey !== undefined, 'meriam webster api key is not set')

    await t.step('basic test', async () => {
        let result = await lookup_from_mw(apikey, 'hello')
        assert(result.error === false)

        result = await lookup_from_mw(apikey, 'lemma')
        assert(result.error, 'meriam webster dont know lemma')
        assert(result.type === 'not a word')
    })
})
