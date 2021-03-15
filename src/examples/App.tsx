import React, { ReactElement } from 'react'
import './App.css'
import { Provider } from '../lib'
import SideNav, { NavLink } from './SideNav'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import BillingsPage from './pages/BillingsPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'

// import SubComponent from './SubComponent';

/*

 in real world replace ../lib by cryptr-react/

 ex: import CryptrLogin from cryptr-react/widgets/CryptrLogin

 ex: import { CryptrLogin } as Login from '...'

 ex:
  import { isAUthenticated, CryptrLogin, CryptrNotification, ... }  from '@cryptr/cryptr-react'


  ex Stripe Elements & Algolia ... etc

    -> import { isAuthenticated, Login, Notification, ... } from '@cryptr/cryptr-react'

 */

// const CRYPTR_CONFIG = {
//   tenant_domain: process.env.CRYPTR_TENANT_DOMAIN || 'leanpay',
//   client_id: process.env.CRYPTR_CLIENT_ID || 'e72b1fbf-3b68-48be-bc7c-f0475c0a68b2',
//   audience: process.env.CRYPTR_AUDIENCE || 'http://127.0.0.1:3000',
//   redirect_uri: process.env.CRYPTR_REDIRECT_URI || 'http://127.0.0.1:3000',
//   locale: process.env.CRYPTR_LOCALE || 'fr',
//   cleeck_base_url: process.env.CRYPTR_CRYPTR_BASE_URL || 'http://localhost:4000',
//   telemetry: false,
// }

const ROUTES: Array<NavLink> = [
  { name: 'Home', active: true, path: '/' },
  { name: 'Profile', active: false, path: '/profile' },
  // {name: 'Settings', active: false, path: '/account'},
  { name: 'Billings', active: false, path: '/billings' },
]

const config = {
  "audience": "http://localhost:3001",
  "cryptr_base_url": "http://localhost:4000",
  "tenant_domain": "shark-academy",
  "client_id": "58a424f2-0a80-4275-837e-ebb7adfd2212",
  "default_redirect_uri": "http://localhost:3001",
  "locale": "en",
  "telemetry": false
}

const App = (): ReactElement => (
  <Provider {...config}>
    <Router>
      <div
        style={{ minHeight: '780px' }}
        className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x"
      >
        <SideNav routes={ROUTES} />

        <div className="divide-y divide-gray-200 lg:col-span-9">
          <div className="py-6 px-4 space-y-6 sm:p-6 lg:pb-8">
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/account">
              <SettingsPage />
            </Route>
            <Route path="/billings">
              <BillingsPage />
            </Route>
          </div>
        </div>
      </div>
    </Router>
  </Provider>
)
export default App
