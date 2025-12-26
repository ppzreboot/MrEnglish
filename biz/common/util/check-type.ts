export
function is_valid_en_phrase(str: string) {
    if (str.length === 0 || str.length > 60) return false
    return /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(str)
}

export
function is_letter(c: string) {
    return ('a' <= c && c <= 'z')
        || ('A' <= c && c <= 'Z')
}

export
function is_real_string(val: unknown): val is string {
    return typeof(val) === 'string' && val.length > 0
}

export
function is_positive_integer(val: number): boolean {
    return Number.isSafeInteger(val) && val > 0
}
