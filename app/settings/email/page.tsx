import { redirect } from 'next/navigation'
import { session_manager } from '#service/auth/session'
import { Bind_email_form } from './_ui/bind-email-form'

export default
async function Settings_email_page() {
	const user = await session_manager.get_user()
	if (!user)
		return redirect('/login')

	return (
		<div className='min-h-screen p-8 max-w-lg mx-auto'>
			<Bind_email_form />
		</div>
	)
}
