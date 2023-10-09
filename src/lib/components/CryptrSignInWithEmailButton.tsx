import { SsoSignOptsAttrs } from '@cryptr/cryptr-spa-js/dist/types/interfaces'
import React, { CSSProperties } from 'react'
import useCryptr from '../useCryptr'
import { hiddenStyle } from '../utils/constants'

/**
 * @typedef {Props} SignInWithEmailProps
 */
type SignInWithEmailProps = {
  /**
   * Required user's email that you want to login
   */
  email: string
  /** Text you want for your button */
  text?: string
  /** Class you want for your button */
  className?: string
  /** Style you want for your button */
  style?: CSSProperties
  /**
   * Set to `false` if you do not want to hide it when live session
   */
  autoHide?: boolean
  /** Any other useful option such as `locale` */
  options?: SsoSignOptsAttrs
}

/**
 * Components to sign in with a specific domain (if known).
 * Usable props : [SignInWithEmailProps](#SignInWithEmailProps)
 *
 * @name SignInWithEmailButton
 * @example <caption>When you want to intiate a session knowing the user's email</caption>
 *
 * return (
 *  <SignInWithEmailButton email={'john@blablabus.fr'} />
 * )
 *
 * @example <caption>When you want to also precise the locale</caption>
 * return (
 *  <SignInWithEmailButton email={'john@blablabus.fr'} locale={'fr'} />
 * )
 *
 * @example <caption>When you want to keep button visible even if there is an active session</caption>
 * return (
 *  <SignInWithEmailButton email={'john@blablabus.fr'} autoHide={false} />
 * )
 *
 */
const CryptrSignInWithEmailButton: React.FC<SignInWithEmailProps> = ({
  email,
  text,
  className,
  style,
  autoHide = true,
  options,
}: SignInWithEmailProps) => {
  const { config, isAuthenticated, isLoading, signInWithEmail } = useCryptr()

  const signInWithEmailText = (): string => {
    return text ? text : localizedText(email, options?.locale || config().default_locale)
  }

  const localizedText = (email: string, locale?: string): string => {
    return locale == 'fr' ? `Se connecter avec ${email}` : `Sign in with ${email}`
  }

  const cryptrSignInWithEmail = () => {
    signInWithEmail(email, options)
  }

  if ((isAuthenticated !== undefined && isAuthenticated() && autoHide) || isLoading) {
    return <div data-testid="" style={hiddenStyle}></div>
  }

  return (
    <button onClick={cryptrSignInWithEmail} data-testid="" className={className} style={style}>
      {signInWithEmailText()}
    </button>
  )
}

export default CryptrSignInWithEmailButton
