import { z } from 'zod'

export
function make_lfmw(apikey: string) {
    return async function lookup_from_mw(word: string): Promise<{
        error: true
        type: 'unknown'
        response: Response
    } | {
        error: true
        type: 'zod'
        zod_err: z.ZodError
        raw_response: string
    } | {
        error: false
        data: I_mw_entry[]
    }> {
        const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`)
        if (!response.ok || !check_content_type(response))
            return {
                error: true,
                type: 'unknown',
                response,
            }
        const raw_response = await response.text()
        const data = JSON.parse(raw_response)
        const result = schema__mw_entries.safeParse(data)
        if (result.success)
            return {
                error: false,
                data: result.data,
            }
        else
            return {
                error: true,
                type: 'zod',
                zod_err: result.error,
                raw_response,
            }
    }
}

const check_content_type = (response: Response) =>
    response.headers.get('Content-TypE')!.includes('application/json')

const schema__mw_prs = z.object({
    ipa: z.string().min(1),
    sound: z.object({
        audio: z.string().min(1),
    }).optional(),
})
export
type I_mw_prs = z.infer<typeof schema__mw_prs>


const schema__mw_entry = z.object({
    meta: z.object({
        uuid: z.uuid(),
    }),
    fl: z.string().optional(),
    hwi: z.object({
        hw: z.string(),
        prs: z.array(schema__mw_prs).optional(),
    }),
    shortdef: z.array(
        z.string().min(1)
    ),
})
export
type I_mw_entry = z.infer<typeof schema__mw_entry>

const schema__mw_entries = z.array(schema__mw_entry)
