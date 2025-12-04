export
function Login_page(props: { github_oauth_link: string }) {
	return <a
		href={props.github_oauth_link}
		style={{
			position: 'absolute',
			top: '35%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		}}
	>Login with GitHub</a>
}
