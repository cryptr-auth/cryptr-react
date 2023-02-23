import { SsoSignOptsAttrs } from '@cryptr/cryptr-spa-js/dist/types/interfaces'
import React, { CSSProperties } from 'react'
import useCryptr from '../useCryptr'
import { hiddenStyle } from '../utils/constants'

type SignInWithEmailProps = {
  email: string
  text?: string
  className?: string
  style?: CSSProperties
  autoHide?: boolean
  options?: SsoSignOptsAttrs
}

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
