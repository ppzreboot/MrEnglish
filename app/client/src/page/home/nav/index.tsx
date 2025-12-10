import { Link } from 'wouter'
import './index.css'

export
function Main_nav() {
  return <nav>
		<h1>MrEnglish</h1>
		<ul>
			<li>
				<Link href='/word'>我的单词</Link>
			</li>
		</ul>
	</nav>
}
