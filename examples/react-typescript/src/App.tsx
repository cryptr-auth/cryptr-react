import React from 'react';
import './App.css';
import { CryptrProvider, useCryptr, Config} from '@cryptr/cryptr-react';


const InnerComponent = () => {
  const {error, isAuthenticated, isLoading, logOut, signInWithDomain, user} = useCryptr()

  return (
    <div className="App">
      <header className="App-header">
        <em>react@{React.version}</em>
        <div style={{textAlign: 'left', fontSize: '0.8rem'}}>
          <pre>
            <code>
              {isAuthenticated() ? 'authenticated': 'unauthenticated'}
            </code>
          </pre>
          <pre>
            <code>
              {isLoading ? 'loading': 'not loading'}
            </code>
          </pre>
          <pre>
            <code>
              {user() ? JSON.stringify(user(), null, 2) : 'no user'}
            </code>
          </pre>
          <pre>
            <code>
              {error ? JSON.stringify(error, null, 2) : 'no error'}
            </code>
          </pre>
        </div>
        {isAuthenticated() ? (
          <button onClick={() => logOut()}>
            Log out
          </button>
        ): (
          <button onClick={() => signInWithDomain(null, {locale: 'en'})}>
            Log in
          </button>
        )
      }
      </header>
    </div>
  )
}

function App() {
  const config: Config = {
    audience: process.env.REACT_APP_CRYPTR_AUDIENCE!,
    cryptr_base_url: process.env.REACT_APP_CRYPTR_BASE_URL!,
    tenant_domain: process.env.REACT_APP_CRYPTR_TENANT_DOMAIN!,
    client_id: process.env.REACT_APP_CRYPTR_CLIENT_ID!,
    default_redirect_uri: process.env.REACT_APP_CRYPTR_DEFAULT_REDIRECT_URI!,
    // default_locale: process.env.REACT_APP_CRYPTR_DEFAULT_LOCALE || 'en',
    // telemetry: process.env.REACT_APP_CRYPTR_TELEMETRY === 'true',
    dedicated_server: process.env.REACT_APP_CRYPTR_DEDICATED_SERVER === 'true',
    // fixed_pkce: process.env.REACT_APP_CRYPTR_FIXED_PKCE === 'true',
    default_slo_after_revoke: process.env.REACT_APP_CRYPTR_DEFAULT_SLO_AFTER_REVOKE === 'true',
  }

  return (
    <CryptrProvider {...config}>
      <InnerComponent />
    </CryptrProvider>
  );
}

export default App;
