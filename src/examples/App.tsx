import React, { ReactElement } from 'react'
import './App.css'
import SideNav, { NavLink } from './SideNav'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import BillingsPage from './pages/BillingsPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { CryptrProvider } from '../lib'

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
//   cryptr_base_url: process.env.CRYPTR_CRYPTR_BASE_URL || 'http://localhost:4000',
//   telemetry: false,
// }

const ROUTES: Array<NavLink> = [
  { name: 'Home', active: true, path: '/' },
  { name: 'Profile', active: false, path: '/profile' },
  // {name: 'Settings', active: false, path: '/account'},
  { name: 'Billings', active: false, path: '/billings' },
]

// const config = {
//   audience: 'http://localhost:5000',
//   cryptr_base_url: 'http://localhost:4000/backoffice',
//   tenant_domain: 'cryptr',
//   client_id: 'd9d4e7e9-22c3-4cdc-9f8f-4f2e39d9e41e',
//   default_redirect_uri: 'http://localhost:5000',
//   default_locale: 'fr',
//   telemetry: true,
// }

// const pingOneconfig = {
//   audience: 'http://localhost:5000',
//   cryptr_base_url: 'https://samly.howto:4443',
//   tenant_domain: 'shark-academy',
//   client_id: '272e67ee-b84a-4c80-bb75-c6469978e7fe',
//   default_redirect_uri: 'http://localhost:5000',
//   default_locale: 'fr',
//   telemetry: false,
// }

const config = {
  audience: process.env.REACT_APP_CRYPTR_AUDIENCE || 'http://localhost:5001',
  cryptr_base_url: process.env.REACT_APP_CRYPTR_BASE_URL || 'https://samly.howto:4443',
  tenant_domain: process.env.REACT_APP_CRYPTR_TENANT_DOMAIN || 'first-tenant',
  client_id: process.env.REACT_APP_CRYPTR_CLIENT_ID || '2834ba3d-4239-4faa-b5c2-3b047bb374e5',
  default_redirect_uri: process.env.REACT_APP_CRYPTR_DEFAULT_REDIRECT_URI || 'http://localhost:5001',
  default_locale: process.env.REACT_APP_CRYPTR_DEFAULT_LOCALE || 'fr',
  telemetry: process.env.REACT_APP_CRYPTR_TELEMETRY || false,
}

const App = (): ReactElement => (
  <CryptrProvider {...config}>
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
  </CryptrProvider>
)
export default App
