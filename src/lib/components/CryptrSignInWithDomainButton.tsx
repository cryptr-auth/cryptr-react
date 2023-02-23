import { SsoSignOptsAttrs } from "@cryptr/cryptr-spa-js/dist/types/interfaces"
import React, { CSSProperties } from "react"
import useCryptr from "../useCryptr"
import { hiddenStyle } from "../utils/constants"

type SignInWithDomainProps = {
  domain?: string
  text?: string
  className?: string
  style?: CSSProperties
  autoHide?: boolean
  options?: SsoSignOptsAttrs
}

const CryptrSignInWithDomainButton: React.FC<SignInWithDomainProps> = ({domain, text, className, style, options, autoHide = true}: SignInWithDomainProps) => {
  const { config, isAuthenticated, isLoading, signInWithDomain } = useCryptr()

  const signInWithDomainText = () : string => {
    return text ? text : localizedText(domain, options?.locale || config().default_locale)
  }

  const localizedText = (domain?: string, locale?: string) => {
    if(domain) {
      return locale == 'en' ? `Sign in with ${domain}` : `Se connecter avec ${domain}`
    } else {
      return locale == 'en' ? `Sign in` : `Se connecter`
    }
  }

  const signInWithDom = () => {
    signInWithDomain(domain, options)
  }

  if((isAuthenticated !== undefined && isAuthenticated() && autoHide) || isLoading) {
    return <div data-testid="CryptrSignInWithDomainButton" style={hiddenStyle}></div>
  }

  return (
    <button
      onClick={signInWithDom}
      data-testid="CryptrSignInWithDomainButton"
      className={className}
      style={style}
    >
      {signInWithDomainText()}
    </button>
  )
}

export default CryptrSignInWithDomainButton
