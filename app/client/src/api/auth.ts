import { output } from '@mr-english-client/api'
import { schema__api_output__auth_status } from '@mr-english/schema'

export
async function retrieve__auth_status() {
    return await output(
        'retrieve__auth_status',
        await fetch('/api/auth/status', {
            method: 'GET',
        }),
        schema__api_output__auth_status,
    )
}
