'use client'

import { useState } from 'react'

export
function Home_page() {
    const [word, set_word] = useState('')

    return (
        <div>
            <input
                value={word}
                onChange={(e) => set_word(e.target.value)}
                onKeyDown={async e => {
                    if (e.key !== 'Enter')
                        return
                    const response = await fetch('/api/word?' + encodeURIComponent(word))
                    const data = await response.json()
                    console.log({ data })
                }}
            />
        </div>
    )
}
