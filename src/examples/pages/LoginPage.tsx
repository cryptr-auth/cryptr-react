import React, { ReactElement } from 'react'
import { SignInWithDomainButton, SignInWithEmailButton, useCryptr } from '../../lib'

const LoginPage = (): ReactElement => {
  const { isAuthenticated, isLoading } = useCryptr()

  const domain = process.env.REACT_APP_CRYPTR_ORG_DOMAIN || 'blablabus'

  const email = process.env.REACT_APP_CRYPTR_USER_EMAIL || `john@${domain}.fr`

  return (
    <div>
      {isLoading === false && isAuthenticated() === true && (
        <div className="bg-indigo-100 h-1 my-8 w-2/3">
          <div className="w-full">
            <p className="w-full text-center">
              Session is live! You can now navigate through app !
            </p>
          </div>
        </div>
      )}
      <div className="mt-8 w-2/3 flex flex-col">
        <SignInWithDomainButton
          text="Login without context (no email no domain)"
          className="button border px-5 py-3 outline outline-2  outline-offset-2 transition duration-150 ease-in-out rounded-md my-4 border-teal-500"
        />
        <SignInWithDomainButton
          domain={domain}
          className="button border px-5 py-3 my-2 outline outline-2"
          options={{ locale: 'fr' }}
        />
        <SignInWithEmailButton
          email={email}
          className="button border px-5 py-3 outline outline-2 my-2"
          text={`Me connecter en tant que ${email}`}
        />
      </div>
    </div>
  )
}

export default LoginPage
