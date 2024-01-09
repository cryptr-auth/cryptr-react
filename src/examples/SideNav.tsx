import React, { ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'
export type NavLink = {
  name: string
  active: boolean
  path: string
}

const svgActiveClasses =
  'flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-teal-500 group-hover:text-teal-500 group-focus:text-teal-600 transition ease-in-out duration-150'
const svgUnactiveClasses =
  'flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150'
const svgClasses = (isActive: boolean) => (isActive ? svgActiveClasses : svgUnactiveClasses)

const SVG = ({ name, active }: NavLink): ReactElement => {
  switch (name) {
    case 'Home':
      return (
        <svg
          className={svgClasses(active)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          ></path>
        </svg>
      )

    case 'Profile':
      return (
        <svg
          className={svgClasses(active)}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      )

    case 'Settings':
      return (
        <svg
          className={svgClasses(active)}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
      )

    case 'Billings':
      return (
        <svg
          className={svgClasses(active)}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          ></path>
        </svg>
      )

    default:
      return <></>
  }
}

const linkActiveClasses =
  'group bg-teal-100 border-l-4 border-teal-500 px-3 py-2 flex items-center text-sm leading-5 font-bold text-teal-700 hover:bg-teal-50 hover:text-teal-700 focus:outline-none focus:bg-teal-100 focus:text-teal-700 transition ease-in-out duration-150'
const linkUnactiveClasses =
  'group mt-1 border-l-4 border-transparent px-3 py-2 flex items-center text-sm leading-5 font-bold text-gray-900 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:bg-gray-50 focus:text-gray-900 transition ease-in-out duration-150'

const NavLink = ({ name, active, path }: NavLink): ReactElement => (
  <Link to={path} className={active ? linkActiveClasses : linkUnactiveClasses} aria-current="page">
    <SVG name={name} active={active} path={path} />
    <span className="truncate">{name}</span>
  </Link>
)

const SideNav = ({ routes }: { routes: Array<NavLink> }): ReactElement => {
  const location = useLocation()

  return (
    <aside className="py-6 lg:col-span-3 border-r-2 border-gray-200">
      <nav>
        {routes.map((route) => (
          <NavLink
            key={route.path}
            name={route.name}
            active={location.pathname === route.path}
            path={route.path}
          />
        ))}
      </nav>
    </aside>
  )
}

export default SideNav
