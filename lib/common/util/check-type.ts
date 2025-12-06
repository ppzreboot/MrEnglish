export
function check_en_word(word: string) {
    if (word.length === 0 || word.length > 50) return false
    return /^[A-Za-z]+(-[A-Za-z]+)*$/.test(word)
}

export
function is_letter(c: string) {
    return ('a' <= c && c <= 'z')
        || ('A' <= c && c <= 'Z')
}
