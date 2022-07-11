import { SsoSignOptsAttrs } from '@cryptr/cryptr-spa-js/dist/types/interfaces'
import React, { CSSProperties } from 'react'
import useCryptr from '../useCryptr'
import { hiddenStyle } from '../utils/constants'

type SsoGatewayProps = {
  idpIds?: string[]
  text?: string
  className?: string
  style?: CSSProperties
  autoHide?: boolean
  options?: SsoSignOptsAttrs
}

const CryptrSsoGatewayButton: React.FC<SsoGatewayProps> = ({
  idpIds,
  text,
  className,
  style,
  options,
  autoHide = true,
}: SsoGatewayProps) => {
  const { config, isAuthenticated, isLoading, signInWithSSOGateway } = useCryptr()

  const ssoGatewayText = (): string => {
    if (text) return text
    return options?.locale || config().default_locale == 'en'
      ? 'Sign in with SSO Gateway'
      : 'Se connecter en SSO avec la Gateway'
  }

  const ssoGateway = () => {
    signInWithSSOGateway(idpIds, options)
  }

  if ((isAuthenticated !== undefined && isAuthenticated() && autoHide) || isLoading) {
    return <div data-testid="CryptrSsoGatewayButton" style={hiddenStyle}></div>
  }

  return (
    <button
      onClick={ssoGateway}
      data-testid="CryptrSsoGatewayButton"
      className={className}
      style={style}
    >
      {ssoGatewayText()}
    </button>
  )
}

export default CryptrSsoGatewayButton
