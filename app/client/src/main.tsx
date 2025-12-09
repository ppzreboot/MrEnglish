import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Switch, Route } from 'wouter'
import { Auth } from './ctx/auth.tsx'
import './style/index.css'

import { Login_page } from './page/login/page.tsx'
import { Home_page } from './page/home/page.tsx'
import { History_page } from './page/home/history/page.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth login={Login_page}>
      <Switch>
        <Route path='/' component={Home_page} />
        <Route path='/history' component={History_page} />
      </Switch>
    </Auth>
  </StrictMode>,
)
