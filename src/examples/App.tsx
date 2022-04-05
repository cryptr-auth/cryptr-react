import React, { ReactElement } from 'react'
import './App.css'
import SideNav, { NavLink } from './SideNav'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import BillingsPage from './pages/BillingsPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { CryptrProvider, useCryptr } from '../lib'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './ProtectedRoute'

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

// pingOneconfig
// const config = {
//   audience: 'http://localhost:5001',
//   cryptr_base_url: 'https://samly.howto:4443',
//   tenant_domain: 'first-tenant',
//   client_id: '2834ba3d-4239-4faa-b5c2-3b047bb374e5',
//   default_redirect_uri: 'http://localhost:5001/login',
//   default_locale: 'en',
//   telemetry: false,
// }

// talentview/My Confs
// const config = {
//   audience: 'http://localhost:5001',
//   client_id: '88f8465a-f238-4331-bff6-855de9e8429e',
//   // client_id: '78b82528-795a-40ef-aefd-dd57acc57a4f',
//   default_locale: 'en',
//   default_redirect_uri: 'http://localhost:5001',
//   tenant_domain: 'tf1',
//   // tenant_domain: 'sercel-saint-gaudens',
//   telemetry: 'FALSE',
//   cryptr_base_url: 'https://talentview.authent.me',
//   // cryptr_base_url: 'https://merciyanis.authent.me',
// }

const config = {
  audience: process.env.REACT_APP_CRYPTR_AUDIENCE || 'http://localhost:5001',
  cryptr_base_url: process.env.REACT_APP_CRYPTR_BASE_URL || 'https://samly.howto:4443',
  tenant_domain: process.env.REACT_APP_CRYPTR_TENANT_DOMAIN || 'second-tenant',
  client_id: process.env.REACT_APP_CRYPTR_CLIENT_ID || 'be332c9f-9d81-4232-9e06-05ecf8c84e09',
  default_redirect_uri:
    process.env.REACT_APP_CRYPTR_DEFAULT_REDIRECT_URI || 'http://localhost:5001',
  default_locale: process.env.REACT_APP_CRYPTR_DEFAULT_LOCALE || 'en',
  telemetry: process.env.REACT_APP_CRYPTR_TELEMETRY == "true" || false,
}

const AppContainer = (): ReactElement => {
  const { isAuthenticated } = useCryptr()
  return (
    <Router>
      <div
        style={{ minHeight: '780px' }}
        className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x"
      >
        {isAuthenticated() && <SideNav routes={ROUTES} />}

        <div className="divide-y divide-gray-200 lg:col-span-9">
          <div className="py-6 px-4 space-y-6 sm:p-6 lg:pb-8">
            <ProtectedRoute exact path="/" component={HomePage} />
            <Route path="/login">
              <LoginPage />
            </Route>
            <ProtectedRoute path="/profile" component={ProfilePage} />
            <ProtectedRoute path="/account" component={SettingsPage} />
            <ProtectedRoute path="/billings" component={BillingsPage} />
          </div>
        </div>
      </div>
    </Router>
  )
}

const App = (): ReactElement => (
  <CryptrProvider {...config}>
    <AppContainer />
  </CryptrProvider>
)

export default App
