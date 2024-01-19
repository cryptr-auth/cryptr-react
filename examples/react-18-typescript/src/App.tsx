import React from 'react';
import logo from './logo.svg';
import './App.css';
import {CryptrProvider} from '@cryptr/cryptr-react'

function InnerContent() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <em>react@{React.version}</em>
      </header>
    </div>
  )
}

function App() {
  const config = {
    audience: process.env.REACT_APP_CRYPTR_AUDIENCE!,
    cryptr_base_url: process.env.REACT_APP_CRYPTR_BASE_URL!,
    tenant_domain: process.env.REACT_APP_CRYPTR_TENANT_DOMAIN!,
    client_id: process.env.REACT_APP_CRYPTR_CLIENT_ID!,
    default_redirect_uri: process.env.REACT_APP_CRYPTR_DEFAULT_REDIRECT_URI!,
    default_locale: process.env.REACT_APP_CRYPTR_DEFAULT_LOCALE || 'en',
    telemetry: process.env.REACT_APP_CRYPTR_TELEMETRY === 'true',
    dedicated_server: process.env.REACT_APP_CRYPTR_DEDICATED_SERVER === 'true',
    fixed_pkce: process.env.REACT_APP_CRYPTR_FIXED_PKCE === 'true',
    default_slo_after_revoke: process.env.REACT_APP_CRYPTR_DEFAULT_SLO_AFTER_REVOKE === 'true',
  }

  return (
    <CryptrProvider {...config}>
      <InnerContent />
    </CryptrProvider>
  );
}

export default App;
