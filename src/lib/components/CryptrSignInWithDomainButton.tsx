import { SsoSignOptsAttrs } from '@cryptr/cryptr-spa-js/dist/types/interfaces'
import React, { CSSProperties } from 'react'
import useCryptr from '../useCryptr'
import { hiddenStyle } from '../utils/constants'

/**
 * @typedef {Object} SignInWithDomainProps
 */
type SignInWithDomainProps = {
  /**
   * The (optional) Organization domain
   */
  domain?: string
  /** Text you want for your button */
  text?: string
  /** Class you want for your button */
  className?: string
  /** Style you want for your button */
  style?: CSSProperties
  /** Set to `false` if you do not want to hide it when live session */
  autoHide?: boolean
  /** Any other useful option such as `locale` */
  options?: SsoSignOptsAttrs
}

/**
 * Component to sign in with a specific domain (if known).
 * Usable props : [SignInWithDomainProps](#SignInWithDomainProps)
 * @category Components
 *
 * @name SignInWithDomainButton
 * @example <caption>When you want user to type email by his own</caption>
 * return (
 *  <SignInWithDomainButton />
 * )
 *
 * @example <caption>When you know user by his organization's domain</caption>
 * return (
 *  <SignInWithDomainButton domain={'blablabus'} />
 * )
 *
 * @example <caption>When you want to specify a different locale</caption>
 * return (
 *  <SignInWithDomainButton locale={'fr'} />
 * )
 *
 * @example <caption>When you to keep the button even if there is an active session</caption>
 * return (
 *  <SignInWithDomainButton autoHide={false} />
 * )
 *
 */
const CryptrSignInWithDomainButton: React.FC<SignInWithDomainProps> = ({
  domain,
  text,
  className,
  style,
  options,
  autoHide = true,
}: SignInWithDomainProps) => {
  const { isAuthenticated, isLoading, signInWithDomain } = useCryptr()

  const signInWithDomainText = (): string => {
    return text ?? localizedText(domain, options?.locale || 'en')
  }

  const localizedText = (domain?: string, locale?: string) => {
    if (domain) {
      return locale == 'en' ? `Sign in with ${domain}` : `Se connecter avec ${domain}`
    } else {
      return locale == 'en' ? `Sign in` : `Se connecter`
    }
  }

  const signInWithDom = () => {
    signInWithDomain(domain, options)
  }

  if ((isAuthenticated !== undefined && isAuthenticated() && autoHide) || isLoading) {
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
