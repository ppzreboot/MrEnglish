export
function Login_page(props: { github_oauth_link: string }) {
	return <a href={props.github_oauth_link}>Login with GitHub</a>
}
