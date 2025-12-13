import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Switch, Route } from 'wouter'
import {
  route_meta__home,
  route_meta__ai_translate,
  route_meta__vocabulary_book,
} from '@mr-english-client/biz'
import { Auth } from './ctx/auth.tsx'
import './style/index.css'

import { Login_page } from './page/login/page.tsx'
import { Home_page } from './page/home/page.tsx'
import { Word_page } from './page/word/page.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth login={Login_page}>
      <Switch>
        <Route path={route_meta__home.path} component={Home_page} />
        <Route path={route_meta__vocabulary_book.path} component={Word_page} />
      </Switch>
    </Auth>
  </StrictMode>,
)
