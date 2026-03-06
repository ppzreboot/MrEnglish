import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist_sans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geist_mono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Project-A',
	description: 'Project-A by PPz',
}

export default function root_layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geist_sans.variable} ${geist_mono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	)
}
