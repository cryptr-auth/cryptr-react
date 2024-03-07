import React from 'react'
import { useCryptr } from '@cryptr/cryptr-react'

function Header() {
  const { logOut, user } = useCryptr()

  const greetings = () => {
    if (user() !== null) {
      return `Hello ${user()?.given_name} ${user()?.family_name}`
    }
  }

  return (
    <header id="header" className="bg-white shadow-sm lg:static lg:overflow-y-visible">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
          <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
            <div className="flex flex-shrink-0 items-center">
              <a href="/">
                <img
                  className="block h-5 w-auto"
                  src="https://res.cloudinary.com/cryptr/image/upload/v1675156380/Cleeck%20demo/communitiz.app_logo_uu32em.svg"
                  alt="Your Company"
                />
              </a>
            </div>
          </div>
          <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
              <div className="w-full">
                <label className="sr-only">Search</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-700 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-700 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
            <button
              type="button"
              className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-700"
              aria-expanded="false"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
            <button
              onClick={() => alert('blob')}
              className="ml-6 inline-flex items-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              New Post
            </button>
            <a
              href="/"
              className="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </a>

            <div className="dropdown cursor-pointer relative ml-5 flex-shrink-0">
              <button
                type="button"
                className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                title={'email'}
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt={'email'}
                />
              </button>

              <div
                className="dropdown-menu absolute hidden right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <a
                  href="/"
                  className="block py-2 px-4 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-0"
                >
                  {greetings()}
                </a>
                <a
                  href="/"
                  className="block py-2 px-4 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-1"
                >
                  Your Profile
                </a>

                <a
                  href="/"
                  className="block py-2 px-4 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-2"
                >
                  Settings
                </a>
              </div>
            </div>

            <button
              onClick={() => logOut()}
              className="hover:bg-red-100 text-red-500 hover:border-red-500 hover:border text-center py-2 px-2 ml-2 rounded-full h-10 w-10 inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <nav className="lg:hidden" aria-label="Global">
        <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
          <a
            href="/"
            aria-current="page"
            className="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium"
          >
            Home
          </a>

          <a href="/" className="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium">
            Popular
          </a>

          <a href="/" className="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium">
            Communities
          </a>

          <a href="/" className="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium">
            Followed
          </a>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={
                  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                }
                alt={user() ? user()?.email : 'email'}
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">
                {user() && user()!.given_name} {user() && user()!.family_name}
              </div>
              <div className="text-sm font-medium text-gray-500">{user() && user()!.email}</div>
            </div>
            <button
              type="button"
              className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>
          </div>
          <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
            <a
              href="/"
              className="block py-2 px-4 text-sm text-gray-700"
              role="menuitem"
              id="user-menu-item-0"
            >
              {greetings()}
            </a>
            <a
              href="/"
              className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              Your Profile
            </a>

            <a
              href="/"
              className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              Settings
            </a>

            <button
              onClick={() => logOut()}
              className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
          <a
            href="/"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-800"
          >
            New Post
          </a>

          <div className="mt-6 flex justify-center">
            <a href="/" className="text-base font-medium text-gray-900 hover:underline">
              Go Premium
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
