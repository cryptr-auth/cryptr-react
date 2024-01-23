import React from 'react';
import './App.css';
import {Config, CryptrProvider, useCryptr} from '@cryptr/cryptr-react'
import Loading from './pages/Loading';
import Dashboard from './pages/Dashboard';

const cryptrConfig: Config = {
  audience: process.env.REACT_APP_CRYPTR_AUDIENCE!,
  cryptr_base_url: process.env.REACT_APP_CRYPTR_BASE_URL,
  tenant_domain: process.env.REACT_APP_CRYPTR_TENANT_DOMAIN!,
  client_id: process.env.REACT_APP_CRYPTR_CLIENT_ID!,
  default_redirect_uri: process.env.REACT_APP_CRYPTR_DEFAULT_REDIRECT_URI!,
  dedicated_server: process.env.REACT_APP_CRYPTR_DEDICATED_SERVER === 'true',
  default_slo_after_revoke: process.env.REACT_APP_CRYPTR_DEFAULT_SLO_AFTER_REVOKE === 'true',
}

const Pages = () => {
  const {isLoading, isAuthenticated, signInWithDomain} = useCryptr()
  if(isAuthenticated()) {
    return <Dashboard />
  }
  if(!isLoading) {
    signInWithDomain()
  }

  return <Loading />
}

function App() {

  return (
    <CryptrProvider {...cryptrConfig}>
      <div className="App">
        <Pages/>
      </div>
    </CryptrProvider>
  );
}

export default App;
