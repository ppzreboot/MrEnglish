import { Link } from 'wouter'
import './index.css'

export
function Main_nav() {
  return <nav>
		<h1>MrEnglish</h1>
		<ul>
			<li>
				<Link href='/history'>查询历史</Link>
			</li>
		</ul>
	</nav>
}
