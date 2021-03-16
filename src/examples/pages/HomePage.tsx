import React, { ReactElement } from 'react'
import { AccountButton, useCryptr } from '../../lib'


const HomePage = (): ReactElement => {
  const { logOut, signupWithRedirect, signinWithRedirect, isAuthenticated, isLoading, defaultScopes } = useCryptr()

  const signIn = () => {
    signinWithRedirect(defaultScopes())
  }
  const signUp = () => {
    signupWithRedirect(defaultScopes())
  }

  return (
  <>
    <div className="bg-white">
    <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
        Try our Cryptr React Playground
        <br />
        <span className="text-indigo-600">With a ready to use setup</span>
      </h2>
      <div className="mt-8 flex">
        <AccountButton className="cursor-pointer mt-2 w-full flex items-center justify-center px-2 py-1 border border-transparent text-xs uppercase leading-6 font-bold rounded-md text-gray-900 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:border-yellow-600 focus:shadow-outline-yellow transition duration-150 ease-in-out"/>
        {isLoading ? (
          <strong>
            <span className="animate-spin mr-2">&#8278;</span>
            Loading
          </strong>
        ) : (
          <>
            {isAuthenticated == undefined || !isAuthenticated() ? (
              <>
                <div className="inline-flex rounded-md shadow">
                  <button
                    onClick={signUp}
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  >
                    Signup
                  </button>
                </div>
                <div className="ml-3 inline-flex">
                  <button
                    onClick={signIn}
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline focus:border-indigo-300 transition duration-150 ease-in-out"
                  >
                    Signin
                  </button>
                </div>
              </>
            ) : (
              <>
                <strong>Logged in !</strong>
                <div className="inline-flex rounded-md shadow">
                  <button
                    onClick={logOut}
                    className="inline-flex items-center justify-center ml-5 px-5 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </>
        )}

      </div>
    </div>
  </div>
  </>
)}

export default HomePage
