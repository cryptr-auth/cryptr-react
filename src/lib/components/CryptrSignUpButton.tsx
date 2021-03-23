import React, { CSSProperties } from 'react'
import useCryptr from '../useCryptr'
import { ProviderConfig } from '../utils/cryptr.interfaces'

type SignUpProps = {
  text?: string
  scopes?: string
  style?: CSSProperties
  className?: string
  autoHide?: boolean
}

const CryptrSignUpButton: React.FC<SignUpProps> = ({
  text,
  scopes,
  style,
  className,
  autoHide = true,
}: SignUpProps) => {
  const { signupWithRedirect, isAuthenticated, isLoading, defaultScopes, config } = useCryptr()
  const signIn = () => {
    signupWithRedirect(scopes || defaultScopes())
  }

  const currentLocale = () => {
    try {
      const currentConfig = config() as ProviderConfig
      console.debug(currentConfig)
      return currentConfig.default_locale
    } catch (error) {
      console.error(error)
      return 'en'
    }
  }

  const signupText = (): string => {
    if (text) {
      return text
    }
    return currentLocale() == 'en' ? 'Sign up' : 'Inscription'
  }

  if ((isAuthenticated !== undefined && isAuthenticated() && autoHide) || isLoading) {
    return <div data-testid="CryptrSignUpButton"></div>
  }

  return (
    <button onClick={signIn} data-testid="CryptrSignUpButton" style={style} className={className}>
      {signupText()}
    </button>
  )
}

export default CryptrSignUpButton
