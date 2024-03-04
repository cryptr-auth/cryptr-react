import React from 'react';
import './App.css';
import {Config, CryptrProvider, SignInWithDomainButton, SignInWithEmailButton, useCryptr} from '@cryptr/cryptr-react'
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
// console.log(cryptrConfig)

const Pages = () => {
  const {isLoading, isAuthenticated} = useCryptr()
  if(isAuthenticated()) {
    return <Dashboard />
  }
  if(!isLoading) {
    const orgDomain = 'decathlon'
    const userEmail = process.env.REACT_APP_CRYPTR_USER_SAMPLE
    console.debug('userEmail', userEmail)

    return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://res.cloudinary.com/cryptr/image/upload/v1675156380/Cleeck%20demo/communitiz.app_logo_uu32em.svg" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6 divide-y divide-slate-400 divide-dashed">
            <div className='pt-4'>
              <SignInWithDomainButton
                className='flex w-full justify-center rounded-md py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible: outline focus-visible:outline-2 focus-visible:outlineoffset-2 bg-teal-600 px-3 hover:bg-teal-500 focus-visible:outline-teal-600'
                text='Without context'
                />
            </div>
            <div className='pt-4'>
              <SignInWithDomainButton
                className='flex w-full justify-center rounded-md py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible: outline focus-visible:outline-2 focus-visible:outlineoffset-2 bg-cyan-600 px-3 hover:bg-cyan-500 focus-visible:outline-cyan-600'
                domain={orgDomain}
                />
            </div>

            {userEmail && <div className='pt-4'>
              <SignInWithEmailButton
                className='flex w-full justify-center rounded-md py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible: outline focus-visible:outline-2 focus-visible:outlineoffset-2 bg-amber-600 px-3 hover:bg-amber-500 focus-visible:outline-amber-600'
                email={userEmail}
                text={`with ${orgDomain} user email`}
                />
            </div>}
          </div>
        </div>
      </div>
    )
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
