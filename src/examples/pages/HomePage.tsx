import React, { ReactElement } from 'react'
import {
  AccountButton,
  LogOutButton,
  SignInButton,
  SignUpButton,
  SsoSignInButton,
  useCryptr,
} from '../../lib'

const HomePage = (): ReactElement => {
  const { isLoading } = useCryptr()

  // const idpId = "misapret_QtqpTS7itBLt4HdoCj5Qck"
  // const idpId = 'leanpay_BmXKRvxe9X5bcUqjKPPRKH'

  return (
    <>
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
          <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            Try our Cryptr React Playground
            <br />
            <span className="text-indigo-600">With a ready to use setup</span>
          </h2>
          <div className="mt-8 flex justify-between">
            {isLoading ? (
              <strong>
                <span className="animate-spin mr-2">&#8278;</span>
                Loading
              </strong>
            ) : (
              <strong>Logged in !</strong>
            )}
            <AccountButton
              className="cursor-pointer mt-2 w-full flex items-center justify-center px-2 py-1 border border-transparent text-xs uppercase leading-6 font-bold rounded-md text-gray-900 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:border-yellow-600 focus:shadow-outline-yellow transition duration-150 ease-in-out"
              style={{ marginRight: '4px' }}
            />
            <SignInButton
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline focus:border-indigo-300 transition duration-150 ease-in-out"
              style={{ marginRight: '4px' }}
            />
            <LogOutButton
              className="inline-flex items-center justify-center ml-5 px-5 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              style={{ marginRight: '4px' }}
              callback={() => {
                console.log('toto')
              }}
            />
            <SignUpButton
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              style={{ marginRight: '4px' }}
            />
          </div>
          <div className="mt-8 w-1/3 flex flex-col">
            {process.env.REACT_APP_MAIN_IDENTITY_PROVIDER_ID && process.env.REACT_APP_MAIN_IDENTITY_PROVIDER_ID !== 'to_define' && (
                <>
                  <SsoSignInButton
                    idpId={process.env.REACT_APP_MAIN_IDENTITY_PROVIDER_ID}
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                    style={{ marginRight: '4px' }}
                  />
                  <small className="text-gray-400">
                    ({process.env.REACT_APP_MAIN_IDENTITY_PROVIDER_ID})
                  </small>
                </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
