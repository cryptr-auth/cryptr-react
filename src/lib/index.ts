// ex Stripe Elements & Algolia ... etc

// -> import CryptrReact, {  SignInButton, Notification, ... } from '@cryptr/cryptr-react'
//
// const cryptrClient = CryptrReact.createClient()

// import { NomObjet } from './components/nom_du_fichier

import CryptrSignInBtn from './components/CryptrSignInButton'
import CryptrSignUpBtn from './components/CryptrSignUpButton'
import CryptrLogOutBtn from './components/CryptrLogOutButton'
import CryptrAccountAccessButton from './components/CryptrAccountAccessButton'
import CryptrProvider from './CryptrProvider'
// import { cryptrUseEffect } from './utils/cryptr.helpers'

export const SignInButton = CryptrSignInBtn
export const SignUpButton = CryptrSignUpBtn
export const LogOutButton = CryptrLogOutBtn
export const AccountButton = CryptrAccountAccessButton
export const Provider = CryptrProvider
export { default as useCryptr } from './useCryptr'

interface MetaDatas {
  [key: string]: unknown
}

export interface CryptrTokenClaims {
  aud: string
  cid: string
  exp: number
  iat: number
  iss: string
  jti: string
  jtt: string
  resource_owner_metadata?: MetaDatas
  application_metadata?: MetaDatas
  scp: string[]
  sub: string
  tnt: string
  version: number
}

const CryptrReact = {}

export default CryptrReact
