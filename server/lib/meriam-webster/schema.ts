import { z } from 'zod'

/* === error === */

interface I_mw_error__zod {
    error: true
    type: 'zod'
    zod_err: z.ZodError
    raw_body: string
    response: Response
}
interface I_mw_error__not_a_word {
    error: true
    type: 'not a word'
    json_body: string[]
}
export type I_mw_error = I_mw_error__zod | I_mw_error__not_a_word

/* === formatted === */

export
interface I_formatted_meriam_webster_prs {
    ipa: string
    audio?: string
}

export
interface I_formatted_meriam_webster_entry {
    hw: string
    /** pronunciation */
    prs?: I_formatted_meriam_webster_prs[]
    /** function label */
    fl?: string
    /** short definition */
    shortdef: string[]
}


/* === raw === */

const schema__mw_prs = z.object({
    ipa: z.string().min(1),
    sound: z.object({
        audio: z.string().min(1),
    }).optional(),
})
export
type I_raw_mw_prs = z.infer<typeof schema__mw_prs>

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
type I_raw_mw_entry = z.infer<typeof schema__mw_entry>

export
const schema__mw_entries = z.array(schema__mw_entry)
