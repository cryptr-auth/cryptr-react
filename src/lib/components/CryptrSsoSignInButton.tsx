import { SsoSignOptsAttrs } from '@cryptr/cryptr-spa-js/dist/types/interfaces'
import React, { CSSProperties } from 'react'
import useCryptr from '../useCryptr'
import { hiddenStyle } from '../utils/constants'

type SsoSignInProps = {
  idpId: string
  text?: string
  className?: string
  style?: CSSProperties
  autoHide?: boolean
  options?: SsoSignOptsAttrs
}

const CryptrSsoSignInButton: React.FC<SsoSignInProps> = ({
  idpId,
  text,
  className,
  style,
  autoHide = true,
  options,
}: SsoSignInProps) => {
  const { config, isAuthenticated, isLoading, signinWithSSO } = useCryptr()

  const ssoSignInText = (): string => {
    if (text) {
      return text
    }
    return (options?.locale || config().default_locale) == 'en'
      ? 'Sign in with SSO'
      : 'Se connecter en SSO'
  }

  const ssoSignIn = () => {
    console.log(`should redirect to sso with idp ${idpId}`)
    signinWithSSO(idpId, options)
  }

  if ((isAuthenticated !== undefined && isAuthenticated() && autoHide) || isLoading) {
    return <div data-testid="CryptrSsoSignInButton" style={hiddenStyle}></div>
  }

  return (
    <button
      onClick={ssoSignIn}
      data-testid="CryptrSsoSignInButtton"
      className={className}
      style={style}
    >
      {ssoSignInText()}
    </button>
  )
}

export default CryptrSsoSignInButton
