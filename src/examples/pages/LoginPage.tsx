import React, { ReactElement } from 'react'
import { SignInButton, SsoSignInButton, useCryptr } from '../../lib'

const LoginPage = (): ReactElement => {
  const { isAuthenticated, isLoading } = useCryptr()
  return (
    <div>
      <div className="mt-8 w-2/3 flex flex-col">
        {process.env.REACT_APP_MAIN_IDENTITY_PROVIDER_ID &&
          process.env.REACT_APP_MAIN_IDENTITY_PROVIDER_ID !== 'to_define' && (
          <>
            <SsoSignInButton
              idpId={process.env.REACT_APP_MAIN_IDENTITY_PROVIDER_ID}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              style={{ marginRight: '4px' }}
              options={{ locale: 'fr' }}
            />
            {!((isAuthenticated !== undefined && isAuthenticated()) || isLoading) && (
              <small className="text-gray-400">
                ({process.env.REACT_APP_MAIN_IDENTITY_PROVIDER_ID})
              </small>
            )}
          </>
        )}
        <SignInButton />
        {isLoading === false && isAuthenticated() === true && (
          <div className="w-full">
            <p className="w-full text-center">
              Session is live! You can now navigate through app !
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginPage
