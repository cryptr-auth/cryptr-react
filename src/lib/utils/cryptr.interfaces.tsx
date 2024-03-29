// import { Config } from '@cryptr/cryptr-spa-js/dist/types/interfaces'

/**
 * Your Basic Cryptr config settings for your React application
 * @interface
 * @prop {string} tenant_domain - Your Account `domain`
 * @prop {string} client_id - Your React Application ID in Cryptr
 * @prop {string} audience - Your React Application base URL
 * @prop {string} default_redirect_uri - Your default URI endpoint adter login
 * @prop {boolean} default_slo_after_revoke - (For SSO) If SLO has to be done for `logOut` process
 * @prop {string} [region] - **Deprecated:** since 1.3.0
 * @prop {string} [cryptr_base_url] - Your Cryptr service URL, ex: `https://my-company.authent.me`
 * @prop {boolean} [dedicated_server=false] - Set to `true` if you owns your Cryptr Service
 */
export interface Config {
  tenant_domain: string
  client_id: string
  audience: string
  default_redirect_uri: string
  default_slo_after_revoke: boolean
  region?: string
  cryptr_base_url?: string
  dedicated_server?: boolean
}

/**
 * Your Precise Cryptr config settings for your React application, extending {@link Config}
 * @see Config
 * @interface
 * @extends Config
 * @prop {function} [onRedirectCallback=DEFAULT_REDIRECT_CALLBACK] - The default behaviour after login, see [DEFAULT_REDIRECT_CALLBACK](./global.html#DEFAULT_REDIRECT_CALLBACK)
 * @prop {function} [onLogOutCallback=DEFAULT_LOGOUT_CALLBACK] - The default behaviour after logout, see [DEFAULT_LOGOUT_CALLBACK](./global.html#DEFAULT_LOGOUT_CALLBACK)
 * @prop {string} [defaultScopes='openid email profile'] - The default scopes you want while opening Cryptr oAuth session
 */
export interface ProviderConfig extends Config {
  /* tslint:disable-next-line */
  onRedirectCallback: (claims: CryptrTokenClaims | null) => void
  onLogOutCallback: () => void
  defaultScopes: string
}
export interface CryptrTokens {
  accessToken: string
}

export interface CryptrClient {
  canHandleAuthentication: () => void
  getClaimsFromAccess: () => void
  handleRedirectCallback: () => void
  isAuthenticated: () => void
  /** @deprecated */
  signInWithRedirect: () => void
}

/**
 * Represents the current Cryptr User that owns the session
 * @interface
 *
 * @prop {string} email - User's email
 * @prop {string} tnt - User's organization domain
 * @prop {string} sub - User's Unique identifier
 * @prop {string} [ips] - [if SSO session] -> the provider type, ex: `azure_ad`
 * @prop {string} [sci] - [if SSO session] -> the SSO connection unique identifier, ex: `blablabus_xeab-1234`
 * @prop {string} given_name - User's given name if known
 * @prop {string} family_name - User's family name if known
 * @prop {string} nickname - User's nickname if known
 * @prop {string} picture - User's picture if known
 *
 */
export interface User {
  email: string
  tnt: string
  sub: string
  ips?: string
  sci?: string
  scp?: string[]
  given_name?: string
  family_name?: string
  nickname?: string
  picture?: string
}

/**
 * Key/value Array representing extra data on a specific resource (User/application)
 * @interface
 */
export interface MetaDatas {
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
  resource_owner_metadata?: { [key: string]: string | number | boolean }
  application_metadata?: { [key: string]: string | number | boolean }
}
