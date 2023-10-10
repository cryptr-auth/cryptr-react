import React, { CSSProperties, Props } from 'react'
import useCryptr from '../useCryptr'
import { hiddenStyle } from '../utils/constants'

/**
 * @typedef {Props} LogOutProps
 */
type LogOutProps = {
  /** Desired text in your button */
  text?: string
  /** Callback called after logout */
  callback?: () => void
  /** Desired style in your button */
  style?: CSSProperties
  /** Desired class in your button */
  className?: string
  /** Set to `false` if you want to display even session is live */
  autoHide?: boolean
  /** Desired url after url */
  targetUrl?: string,
  /** Set to `true`if you want also a SLO request among token revokation */
  sloAfterRevoke?: boolean
}


/**
 * Component to log out your user from it's current session.
 * Usable props [LogoutProps](#LogOutProps)
 * @name LogOutButton
 * @category Components
 */
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
