import React, { CSSProperties } from 'react'
import useCryptr from '../useCryptr'

type SignUpProps = {
  text?: string
  scopes?: string
  style?: CSSProperties
  className?: string
  autoHide?: boolean
}

const CryptrSignUpButton: React.FC<SignUpProps> = ({
  text = 'Sign up',
  scopes,
  style,
  className,
  autoHide = true,
}: SignUpProps) => {
  const { signupWithRedirect, isAuthenticated, isLoading, defaultScopes } = useCryptr()
  const signIn = () => {
    signupWithRedirect(scopes || defaultScopes())
  }

  if (isLoading && (isAuthenticated !== undefined && isAuthenticated() && autoHide)) {
    return <div data-testid="CryptrSignUpButton"></div>
  }

  return (
    <button onClick={signIn} data-testid="CryptrSignUpButton" style={style} className={className}>
      {text}
    </button>
  )
}

export default CryptrSignUpButton
