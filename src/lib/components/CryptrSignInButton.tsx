import React, { CSSProperties } from 'react'
import useCryptr from '../useCryptr'

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
  text = 'Sign in',
  scopes,
  style,
  className,
  autoHide = true,
}: SignInProps) => {
  const { isAuthenticated, isLoading, signinWithRedirect, defaultScopes } = useCryptr()

  const signIn = () => {
    signinWithRedirect(scopes || defaultScopes())
  }
  if (isLoading || (isAuthenticated !== undefined && isAuthenticated() && autoHide)) {
    return <div data-testid="CryptrSignInButton"></div>
  }

  return (
    <button onClick={signIn} data-testid="CryptrSignInButton" style={style} className={className}>
      {text}
    </button>
  )
}

export default CryptrSignInButton
