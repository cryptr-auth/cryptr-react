import React, { CSSProperties } from 'react'
import useCryptr from '../useCryptr'

type LogOutProps = {
  text?: string
  callback: () => void
  style?: CSSProperties
  className?: string
  autoHide?: boolean
}

const CryptrLogOutButton: React.FC<LogOutProps> = ({
  text = 'Log out',
  callback,
  style,
  className,
  autoHide = true,
}: LogOutProps) => {
  const { isAuthenticated, isLoading, logOut } = useCryptr()
  const signOut = () => {
    logOut(callback)
  }

  if ((isAuthenticated !== undefined && !isAuthenticated() && autoHide) || isLoading ) {
    return <div data-testid="CryptrLogOutButton"></div>
  }
  return (
    <button onClick={signOut} data-testid="CryptrLogOutButton" style={style} className={className}>
      {text}
    </button>
  )
}

export default CryptrLogOutButton
