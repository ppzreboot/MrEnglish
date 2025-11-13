import { useEffect, useState } from 'react'
import { retrieve__auth_status, type I_auth_status } from '../api/auth'
import { retrieve__lookup } from '../api/lookup'

export
function App() {
  const [state, set_state] = useState<I_auth_status | null>(null)
  useEffect(() => {
    retrieve__auth_status().then(set_state)
  }, [])

  if (state === null)
    return <div>Loading Auth Status</div>
  if (state.signed_in)
    return <Main />
  return <ul>
    {state.oauth_list.map(oauth =>
      <li>
          <a href={oauth.link}>{oauth.key}</a>
      </li>
    )}
  </ul>
}

function Main() {
  const [lookup, set_lookup] = useState('')

  const go_lookup = async () => {
    const [error, result] = await retrieve__lookup(lookup)
    console.log({ error, result })
  }
  return <div>
    <input
      value={lookup}
      onChange={evt => set_lookup(evt.target.value)}
      onKeyDown={evt => {
        if (evt.key === 'Enter')
          go_lookup()
      }}
    />
    <button onClick={go_lookup}>Search</button>
  </div>
}
