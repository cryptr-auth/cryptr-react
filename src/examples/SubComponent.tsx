import React from 'react'
import { AccountButton, LogOutButton, SignUpButton, useCryptr } from '../lib'
import { HelloWorld } from '../lib/widgets'

const SubComponent: React.FC = () => {
  const { isAuthenticated, decoratedRequest } = useCryptr()

  const logOutCallBack = () => {
    window.history.pushState(null, '', '/')
  }

  const logOutStyle = {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '4px',
    margin: '0.5rem',
  }

  const fetchCourses = () => {
    decoratedRequest({ method: 'GET', url: 'http://localhost:5000/api/v1/courses/' })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <header className="App-header">
      {isAuthenticated() && <div style={{ backgroundColor: 'green' }}>Connecté !</div>}
      <HelloWorld />
      <AccountButton>
        <div onClick={fetchCourses} className="space-y-1">
          <p className="text-base leading-6 font-medium text-gray-900">Mes courses</p>
          <p className="text-sm leading-5 text-gray-500">
            Click to continue learning and see your in-progress courses
          </p>
        </div>
      </AccountButton>
      <SignUpButton scopes="email profile" />
      <LogOutButton callback={logOutCallBack} style={logOutStyle} />
    </header>
  )
}

export default SubComponent
