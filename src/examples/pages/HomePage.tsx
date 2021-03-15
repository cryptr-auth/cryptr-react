import React, { ReactElement } from 'react'

const SignSection = (): ReactElement => (
  <div className="bg-white">
    <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
        Try our Cryptr React Playground
        <br />
        <span className="text-indigo-600">With a ready to use setup</span>
      </h2>
      <div className="mt-8 flex">
        <div className="inline-flex rounded-md shadow">
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Signup
          </a>
        </div>
        <div className="ml-3 inline-flex">
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline focus:border-indigo-300 transition duration-150 ease-in-out"
          >
            Signin
          </a>
        </div>
      </div>
    </div>
  </div>
)

const HomePage = (): ReactElement => (
  <>
    <SignSection />
  </>
)

export default HomePage
