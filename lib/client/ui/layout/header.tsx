import { Link, useLocation } from 'wouter'
import { route_meta_list } from '@mr-english-client/biz'

export
function Header() {
	const [location] = useLocation()	
  return <header>
		<h1>MrEnglish</h1>
		<nav>
			<ul>
				{route_meta_list.map(meta =>
					<li key={meta.path}>
						{meta.path === location
							? <h2>
								{route_meta_list
									.find(meta => meta.path === location)
									?.title || '???'
								}
							</h2>
							: <Link href={meta.path}>{meta.title}</Link>
						}
					</li>
				)}
			</ul>
		</nav>
	</header>
}
