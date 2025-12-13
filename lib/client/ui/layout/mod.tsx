import type { ReactNode } from 'react'
import { Header } from './header.tsx'
import './index.css'

export
function Layout(props: { children: ReactNode }) {
	return <div className='simple layout'>
		<Header />
		<main>
			{props.children}
		</main>
		<footer>
			MrEnglish
		</footer>
	</div>
}
