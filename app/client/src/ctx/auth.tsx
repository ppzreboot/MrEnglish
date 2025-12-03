import { useState, useEffect, type ReactNode } from 'react'
import { retrieve__auth_status } from '../api/auth.ts'

type I_auth = {
	ready: false
	state: null
} | {
	ready: true
	state: {
		signed_in: true
		// user: I_CTX__user
	} | {
		signed_in: false
		github_oauth_link: string
	}
}

export
const Auth = (props: {
	login: (props: { github_oauth_link: string }) => ReactNode
	children: ReactNode
}) => {
	const [{ ready, state }, set_state] = useState<I_auth>({ ready: false, state: null })
  useEffect(() => {
    retrieve__auth_status().then(state => {
			set_state({ ready: true, state })
		})
  }, [])
	return ready
		? (
			state.signed_in
				? props.children
				: <props.login github_oauth_link={state.github_oauth_link} />
		)
		: '检查登录状态...'
}
