import React, { ReactElement } from 'react'
import { AccountButton, useCryptr } from '../../lib'
import { User } from '../../lib/utils/cryptr.interfaces'

const ProfilePage = (): ReactElement => {
  const {user, isAuthenticated} = useCryptr()
  const currentUser = user() as unknown as User | null
  const defaultPicUrl = 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80h'


  return (
  <div className="py-6 px-4 space-y-6 sm:p-6 lg:pb-8">
    {(isAuthenticated() && currentUser) ? (
      <>
        <div>
        <h2 className="text-lg leading-6 font-bold text-gray-900">Profile</h2>
        <p className="mt-1 text-sm leading-5 text-gray-500">
          This information will be displayed publicly so be careful what you share.
        </p>
        <strong>{currentUser ? currentUser.email : ''}</strong>
      </div>
      <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
        <div className="flex-grow space-y-6">
          <div className="space-y-1">
            <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700">
              Username
            </label>
            <div className="rounded-md shadow-sm flex">
              <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                workcation.com/
              </span>
              <input
                id="username"
                className="form-input flex-grow block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                defaultValue={currentUser ? currentUser.nickname : ''}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="about" className="block text-sm leading-5 font-medium text-gray-700">
              About
            </label>
            <div className="rounded-md shadow-sm">
              <textarea
                id="about"
                rows={3}
                className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                defaultValue={''}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Brief description for your profile. URLs are hyperlinked.
            </p>
          </div>
        </div>
        <div className="flex-grow space-y-1 lg:flex-grow-0 lg:flex-shrink-0">
          <p className="block text-sm leading-5 font-medium text-gray-700" aria-hidden="true">
            Photo
          </p>
          <div className="lg:hidden">
            <div className="flex items-center">
              <div
                className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                aria-hidden="true"
              >
                <img
                  className="rounded-full h-full w-full"
                  src={currentUser ? currentUser.picture : defaultPicUrl}
                />
              </div>
              <div className="ml-5 rounded-md shadow-sm">
                <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center focus-within:border-blue-300 focus-within:shadow-outline-blue focus-within:text-gray-900 transition duration-150 ease-in-out">
                  <label
                    htmlFor="user_photo"
                    className="relative text-sm leading-4 font-medium text-gray-700 group-hover:text-gray-500 transition duration-150 ease-in-out pointer-events-none"
                  >
                    <span>Change</span>
                    <span className="sr-only"> user photo</span>
                  </label>
                  <input
                    id="user_photo"
                    type="file"
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden relative rounded-full overflow-hidden lg:block transition duration-150 ease-in-out">
            <img
              className="relative rounded-full w-40 h-40"
              src={currentUser ? currentUser.picture : defaultPicUrl}
            />
            <label className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm leading-5 font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100 transition duration-150 ease-in-out">
              <span>Change</span>
              <span className="sr-only"> user photo</span>
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 sm:col-span-6">
          <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">
            First name
          </label>
          <input
            id="first_name"
            defaultValue={currentUser ? currentUser.given_name : ''}
            className="form-input mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <label htmlFor="last_name" className="block text-sm font-medium leading-5 text-gray-700">
            Last name
          </label>
          <input
            id="last_name"
            defaultValue={currentUser ? currentUser.family_name : ''}
            className="form-input mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
        <div className="col-span-12">
          <label htmlFor="url" className="block text-sm font-medium leading-5 text-gray-700">
            URL
          </label>
          <input
            id="url"
            className="form-input mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <label htmlFor="company" className="block text-sm font-medium leading-5 text-gray-700">
            Company
          </label>
          <input
            id="company"
            className="form-input mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
          <AccountButton isWidget={false} text="Manage my Account" className="cursor-pointer mt-2 w-full flex items-center justify-center px-2 py-1 border border-transparent text-xs uppercase leading-6 font-bold rounded-md text-gray-900 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:border-yellow-600 focus:shadow-outline-yellow transition duration-150 ease-in-out"/>
      </div>
      </>
    ): (
      <strong>Please Sign in to see here</strong>
    )}
  </div>
)}

export default ProfilePage
