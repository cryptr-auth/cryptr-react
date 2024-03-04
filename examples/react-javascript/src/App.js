import './App.css'
import { CryptrProvider, useCryptr } from '@cryptr/cryptr-react'
import React from 'react'

function InnerComponent() {
  // eslint-disable-line no-eval
  const { isAuthenticated, isLoading, error, logOut, signInWithDomain, user } = useCryptr() // eslint-disable-line no-eval

  return (
    <div className="App">
      <header className="App-header">
        <em>react@{React.version}</em>
        <p style={{ textAlign: 'left', fontSize: '0.8rem' }}>
          <pre>
            <code>{isAuthenticated() ? 'authenticated' : 'unauthenticated'}</code>
          </pre>
          <pre>
            <code>{isLoading ? 'loading' : 'not'}</code>
          </pre>
          <pre>
            <code>{user() ? JSON.stringify(user(), null, 2) : 'no user'}</code>
          </pre>
          <pre>
            <code>{error ? JSON.stringify(error, null, 2) : 'no error'}</code>
          </pre>
        </p>
        {isAuthenticated() ? (
          <button onClick={() => logOut()}>Log out</button>
        ) : (
          <button onClick={() => signInWithDomain()}>Log in</button>
        )}
      </header>
    </div>
  )
}
function App() {
  const config = {
    audience: process.env.REACT_APP_CRYPTR_AUDIENCE,
    cryptr_base_url: process.env.REACT_APP_CRYPTR_BASE_URL,
    tenant_domain: process.env.REACT_APP_CRYPTR_TENANT_DOMAIN,
    client_id: process.env.REACT_APP_CRYPTR_CLIENT_ID,
    default_redirect_uri: process.env.REACT_APP_CRYPTR_DEFAULT_REDIRECT_URI,
    default_locale: process.env.REACT_APP_CRYPTR_DEFAULT_LOCALE || 'en',
    telemetry: process.env.REACT_APP_CRYPTR_TELEMETRY === 'true',
    dedicated_server: process.env.REACT_APP_CRYPTR_DEDICATED_SERVER === 'true',
    fixed_pkce: process.env.REACT_APP_CRYPTR_FIXED_PKCE === 'true',
    default_slo_after_revoke: process.env.REACT_APP_CRYPTR_DEFAULT_SLO_AFTER_REVOKE === 'true',
  }
  return (
    <CryptrProvider {...config}>
      <div className="App">
        <InnerComponent />
      </div>
    </CryptrProvider>
  )
}

export default App
