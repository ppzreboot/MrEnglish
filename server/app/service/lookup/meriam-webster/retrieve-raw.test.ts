import { assert } from '@std/assert'
import { make_lfmw } from './retrieve-raw.ts'

Deno.test('lookup_from_mw', async t => {
    const lookup_from_mw = make_lfmw(Deno.env.get('mw_api_key')!)
    await t.step('basic test', async () => {
        let result = await lookup_from_mw('hello')
        assert(result.error === false)
        result = await lookup_from_mw('lemma')
        assert(result.error)

        result = await lookup_from_mw('test')
        assert(result.error === false)
        result = await lookup_from_mw('dog')
        assert(result.error === false)
        result = await lookup_from_mw('school')
        assert(result.error === false)
    })
})
