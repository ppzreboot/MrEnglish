import { useEffect, useState, useRef } from 'react'
import { retrieve__auth_status, type I_auth_status } from '../api/auth'
import { retrieve__lookup, type I_word_result } from '../api/lookup'

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
  const [result, set_result] = useState<null | I_word_result>(null)
  const [loading, set_loading] = useState(false)

  const go_lookup = async () => {
    if (loading) return
    try {
      set_loading(true)
      set_result(null)
      const [error, _result] = await retrieve__lookup(lookup)
      if (error === null)
        set_result(_result)
    } finally {
      set_loading(false)
    }
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
    <button
      onClick={go_lookup}
      disabled={loading}
    >Search</button>

    <div>
      {result !== null && <>
        <h3>Lookup Result</h3>
        <Code
          code={JSON.stringify(result, null, 4)}
        />
      </>}
      {loading && '...'}
    </div>
  </div>
}

function Code(props: { code: string }) {
  const ref = useRef<HTMLPreElement | null>(null)
  useEffect(() => {
    ref.current!.innerHTML = props.code
  }, [props.code])
  return <pre ref={ref} />
}
