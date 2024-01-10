import React from 'react'
import { LogOutButton, SignInWithDomainButton, useCryptr } from '../lib'

const SubComponent: React.FC = () => {
  const { isAuthenticated } = useCryptr()

  const logOutCallBack = () => {
    window.history.pushState(null, '', '/')
  }

  const logOutStyle = {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '4px',
    margin: '0.5rem',
  }

  return (
    <header className="App-header">
      {isAuthenticated() && <div style={{ backgroundColor: 'green' }}>Connecté !</div>}
      <SignInWithDomainButton />
      <LogOutButton callback={logOutCallBack} style={logOutStyle} />
    </header>
  )
}

export default SubComponent
