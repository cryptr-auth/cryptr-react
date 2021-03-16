import React, { CSSProperties, useState } from 'react'
import useCryptr from '../useCryptr'
import CryptrLogOutButton from './CryptrLogOutButton'
import CryptrSignInButton from './CryptrSignInButton'
import CryptrSignUpButton from './CryptrSignUpButton'

type AccountAccessProps = {
  children?: JSX.Element
  text?: string
  style?: CSSProperties
  className?: string
  isWidget?: boolean
  tenantName?: string
  tenantLogo?: string
  defaultSignType?: string
  defaultSignText?: string
}

const CryptrAccountAccessButton = ({
  children,
  text = 'My account',
  defaultSignType = 'signin',
  defaultSignText,
  style,
  className,
  isWidget = true,
  tenantName,
  tenantLogo,
}: AccountAccessProps): JSX.Element => {
  const { isAuthenticated, isLoading, userAccountAccess, user } = useCryptr()
  const [widgetOpened, setWidgetOpened] = useState(false)

  const goToAccount = () => {
    userAccountAccess()
  }

  const toggleWidget = () => {
    setWidgetOpened(!widgetOpened)
  }

  const email = (): string | undefined => {
    const currentUser = user()
    if (currentUser !== null) {
      return currentUser['email']
    }
  }

  const fullName = (): string | undefined => {
    const mEmail = email()
    if (mEmail !== undefined && typeof mEmail == 'string') {
      return mEmail.split('@')[0].split('.').join(' ')
    }
  }

  const initials = (): string | undefined => {
    const mFullName = fullName()
    if (mFullName !== undefined && mFullName !== null && typeof mFullName == 'string') {
      const match = mFullName.match(/\b(\w)/g)
      return match !== null ? match.join('') : undefined
    }
  }

  if (isAuthenticated !== undefined && !isAuthenticated()) {
    return (
      <div data-testid="CryptrAccountAccessButton">
        {defaultSignType === 'signin' && (
          <CryptrSignInButton text={defaultSignText} style={style} className={className} />
        )}
        {defaultSignType === 'signup' && (
          <CryptrSignUpButton text={defaultSignText} style={style} className={className} />
        )}
      </div>
    )
  }

  if (isLoading) {
    return <div data-testid="CryptrAccountAccessButton"></div>;
  }

  const snakeToCamel = str =>
  str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .replace('-', ' ')
  );

  if(tenantName === undefined) {
    const currentUser = user()
    if(currentUser) {
      const tnt = currentUser["tnt"]
      tenantName = snakeToCamel(tnt)
    }
  }

  if (isWidget) {
    return (
      <div data-testid="CryptrAccountAccessButton" className="flex items-center">
        <div className="flex-shrink-0">
          <span className="rounded-md">
            <div className="z-20 relative">
              <button
                type="button"
                onClick={toggleWidget}
                className="bg-white shadow-lg px-6 py-2 rounded-md text-gray-500 flex flex-row items-center space-x-2 text-base leading-6 font-medium hover:bg-gray-100 transition ease-in-out duration-150 focus:outline-none"
              >
                {tenantLogo && (
                  <img className="w-6 mb-0" src={tenantLogo} alt={`${tenantName} logo`} />
                )}
                <span className="text-gray-900 hover:text-gray-800 focus:text-gray-800 uppercase text-xs font-extrabold">
                  {tenantName}
                </span>
                <div className="uppercase rounded-full h-6 w-6 flex items-center justify-center bg-blue-500 text-xs text-white">
                  {initials()}
                </div>

                <svg
                  className="text-gray-400 hover:text-gray-300 focus:text-gray-300 h-5 w-5 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {widgetOpened && (
                <div className="absolute right-0 mt-3 px-2 w-screen max-w-xs sm:px-0">
                  <div className="rounded-lg shadow-lg">
                    <div className="rounded-lg overflow-hidden">
                      <div className="relative bg-white">
                        <div className="p-6 flex flex-wrap w-full">
                          <div className="flex items-center">
                            <div className="uppercase rounded-full h-12 w-12 flex items-center justify-center bg-blue-500 text-xl ont-bold text-white">
                              {initials()}
                            </div>
                          </div>
                          <div className="ml-6 w-8/12">
                            <div className="truncate">
                              <h3 className="capitalize text-gray-900 text-base leading-5 font-bold mb-0">
                                {fullName()}
                              </h3>
                              <p className="mt-1 text-gray-700 font-medium text-sm leading-5">
                                {email()}
                              </p>
                            </div>
                            <div className="flex flex-wrap w-full justify-between">
                              <div className="rounded-md shadow">
                                <CryptrAccountAccessButton
                                  className="cursor-pointer mt-2 w-full flex items-center justify-center px-2 py-1 border border-transparent text-xs uppercase leading-6 font-bold rounded-md text-gray-900 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:border-yellow-600 focus:shadow-outline-yellow transition duration-150 ease-in-out"
                                  text="Manage my account"
                                  isWidget={false}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {children && (
                          <div className="z-20 border-t-4 border-gray-100 relative grid gap-6 bg-white p-6 sm:gap-8 hover:bg-gray-100 transition ease-in-out duration-150">
                            <div className="-m-3 p-3 flex items-start space-x-4">{children}</div>
                          </div>
                        )}
                        <div className="border-t-4 border-white p-6 bg-gray-100 space-y-6 sm:flex sm:space-y-0 sm:space-x-10">
                          <div className="flow-root">
                            <div className="rounded-md shadow">
                              <CryptrLogOutButton
                                className="cursor-pointer w-full flex items-center justify-center px-2 py-1 border border-transparent text-xs uppercase leading-6 font-bold rounded-md text-yellow-500 bg-white hover:text-yellow-400 focus:outline-none focus:border-yellow-300 focus:shadow-outline-yellow transition duration-150 ease-in-out"
                                text="Log out"
                                callback={() => {
                                  console.debug('logged out')
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </span>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={goToAccount}
      data-testid="CryptrAccountAccessButton"
      style={style}
      className={className}
    >
      {text}
    </button>
  )
}

export default CryptrAccountAccessButton
