// ex Stripe Elements & Algolia ... etc

// -> import CryptrReact, {  SignInButton, Notification, ... } from '@cryptr/cryptr-react'
//
// const cryptrClient = CryptrReact.createClient()

// import { NomObjet } from './components/nom_du_fichier

import CryptrLogOutBtn from './components/CryptrLogOutButton'
import CryptrAccountAccessButton from './components/CryptrAccountAccessButton'
import CryptrSignInWithDomainButton from './components/CryptrSignInWithDomainButton'
import CryptrSignInWithEmailButton from './components/CryptrSignInWithEmailButton'

export const SignInWithDomainButton = CryptrSignInWithDomainButton
export const SignInWithEmailButton = CryptrSignInWithEmailButton
export const LogOutButton = CryptrLogOutBtn
export const AccountButton = CryptrAccountAccessButton
export { default as CryptrProvider } from './CryptrProvider'
export { default as useCryptr } from './useCryptr'

/**
 * Key/value Array representing extra data on a specific resource (User/application)
 * @interface
 */
interface MetaDatas {
  [key: string]: string | number | boolean
}

/**
 * Decoded claims from a token (ID/Access)
 * @interface
 *
 * @prop {number} iat - Unix timestamp of Token issued at
 * @prop {string} aud - Audience of the React app that generetaed this token
 * @prop {string} cid - Client ID of the React app that generetaed this token
 * @prop {string} dbs - Database/environment of the app/user
 * @prop {string} iss - Cryptr service that issued the token
 * @prop {string[]} scp - Authorized scopes while using this token
 * @prop {string} tnt - Organization's domain that user belongs to.
 * @prop {string} sub - Cryptr User's unique identifier
 * @prop {number} exp - Unix timestamp for the expiration date for this token
 * @prop {number} jti - JSON web Token unique Identifier
 * @prop {number} ver - Current version of Cryptr token
 * @prop {number} jtt - JSON web Token type. ex `openid`
 * @prop {MetaDatas} resource_owner_metadata - Array of key/pair of data identifying the user (populated for exemple by SSO)
 * @prop {MetaDatas} application_metadata - Array of key/pair of data related to the application
 */
export interface CryptrTokenClaims {
  iat: number
  aud: string
  cid: string
  dbs: string
  iss: string
  scp: string[]
  tnt: string
  sub: string
  exp: number
  jti: string
  ver: number
  jtt: string
  resource_owner_metadata?: MetaDatas
  application_metadata?: MetaDatas
}

const CryptrReact = {}

/**
 * @interface SsoSignOptsAttrs
 *
 * @prop {string} [clientId] - Specific Cryptr React Application Unique identifier reference
 * @prop {string} [tenantDomain] - Specific Cryptr Organization's domain
 * @prop {string[]} [scope] - Specific scope for this login request
 * @prop {string} [redirectUri] - Specific redirect URI for this login request
 * @prop {string} [locale] - Specific locale for this login request
 */

export default CryptrReact
