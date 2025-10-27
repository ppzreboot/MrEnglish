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
                onKeyDown={e => {
                    if (e.key !== 'Enter')
                        return
                    //
                }}
            />
        </div>
    )
}
