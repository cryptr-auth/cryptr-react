import React, { CSSProperties } from 'react'
import useCryptr from '../useCryptr'
import { hiddenStyle } from '../utils/constants'

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

  const signupText = (): string => {
    if (text) {
      return text
    }
    return config().default_locale == 'en' ? 'Sign up' : 'Inscription'
  }

  if ((isAuthenticated !== undefined && isAuthenticated() && autoHide) || isLoading) {
    return <div data-testid="CryptrSignUpButton" style={hiddenStyle}></div>
  }

  return (
    <button onClick={signIn} data-testid="CryptrSignUpButton" style={style} className={className}>
      {signupText()}
    </button>
  )
}

export default CryptrSignUpButton
