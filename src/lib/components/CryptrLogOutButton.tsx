import React, { CSSProperties } from 'react'
import useCryptr from '../useCryptr'
import { hiddenStyle } from '../utils/constants'

type LogOutProps = {
  text?: string
  callback?: () => void
  style?: CSSProperties
  className?: string
  autoHide?: boolean
  targetUrl?: string,
  sloAfterRevoke?: boolean
}

const CryptrLogOutButton: React.FC<LogOutProps> = ({
  text,
  callback,
  style,
  className,
  autoHide = true,
  targetUrl,
  sloAfterRevoke
}: LogOutProps) => {
  const { isAuthenticated, isLoading, logOut, config } = useCryptr()
  const signOut = () => {
    logOut(callback, targetUrl, sloAfterRevoke)
  }

  const logoutText = (): string => {
    if (text) {
      return text
    }
    return config().default_locale == 'en' ? 'Log out' : 'Déconnexion'
  }

  if ((isAuthenticated !== undefined && !isAuthenticated() && autoHide) || isLoading) {
    return <div data-testid="CryptrLogOutButton" style={hiddenStyle}></div>
  }
  return (
    <button onClick={signOut} data-testid="CryptrLogOutButton" style={style} className={className}>
      {logoutText()}
    </button>
  )
}

export default CryptrLogOutButton
