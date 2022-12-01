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

const ROUTES: Array<NavLink> = [
  { name: 'Home', active: true, path: '/' },
  { name: 'Profile', active: false, path: '/profile' },
  // {name: 'Settings', active: false, path: '/account'},
  { name: 'Billings', active: false, path: '/billings' },
]

const config = {
  audience: process.env.REACT_APP_CRYPTR_AUDIENCE || 'http://localhost:5001',
  cryptr_base_url: process.env.REACT_APP_CRYPTR_BASE_URL || 'https://samly.howto:4443',
  tenant_domain: process.env.REACT_APP_CRYPTR_TENANT_DOMAIN || 'second-tenant',
  client_id: process.env.REACT_APP_CRYPTR_CLIENT_ID || 'be332c9f-9d81-4232-9e06-05ecf8c84e09',
  default_redirect_uri:
    process.env.REACT_APP_CRYPTR_DEFAULT_REDIRECT_URI || 'http://localhost:5001',
  default_locale: process.env.REACT_APP_CRYPTR_DEFAULT_LOCALE || 'en',
  telemetry: process.env.REACT_APP_CRYPTR_TELEMETRY == 'true' || false,
  dedicated_server: process.env.REACT_APP_CRYPTR_DEDICATED_SERVER == 'true' || false,
  fixed_pkce: process.env.REACT_APP_CRYPTR_FIXED_PKCE == 'true' || false
}

console.debug(config);

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
