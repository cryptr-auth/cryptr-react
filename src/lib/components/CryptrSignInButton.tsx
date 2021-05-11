import React, { CSSProperties } from 'react'
import useCryptr from '../useCryptr'
import { hiddenStyle } from '../utils/constants'

type SignInProps = {
  text?: string
  scopes?: string
  style?: CSSProperties
  className?: string
  autoHide?: boolean
}

// interface SignInState {
//   text?: string,
//   scopes: string,
//   autoHide?: boolean
// }

/**
 * Component is described here.
 *
 * @example ./extra.examples.md
 */
// const CryptrSignInButton: FunctionComponent<SignInState> = ({text = "Sign in", scopes, autoHide = true}) => {
const CryptrSignInButton: React.FC<SignInProps> = ({
  text,
  scopes,
  style,
  className,
  autoHide = true,
}: SignInProps) => {
  const { isAuthenticated, isLoading, signinWithRedirect, defaultScopes, config } = useCryptr()

  const signinText = (): string => {
    if (text) {
      return text
    }
    return config().default_locale == 'en' ? 'Sign in' : 'Connexion'
  }

  const signIn = () => {
    signinWithRedirect(scopes || defaultScopes())
  }
  if ((isAuthenticated !== undefined && isAuthenticated() && autoHide) || isLoading) {
    return <div data-testid="CryptrSignInButton" style={hiddenStyle}></div>
  }

  return (
    <button onClick={signIn} data-testid="CryptrSignInButton" style={style} className={className}>
      {signinText()}
    </button>
  )
}

export default CryptrSignInButton
