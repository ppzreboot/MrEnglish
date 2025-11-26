import type { I_ecdict } from '@ppz-ai/ecdict-sqlite3'

export
interface I_mw_prs {
    ipa: string
    audio?: string
}

export
interface I_meriam_webster {
    hw: string
    /** pronunciation */
    prs?: I_mw_prs[]
    /** function label */
    fl: string
    /** short definition */
    shortdef: string[]
}

export
interface I_lookup_result {
    ecdict: I_ecdict
    mw: I_meriam_webster[] | null
}
