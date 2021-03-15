export interface CleeckTokens {
  accessToken: string
}

export interface CleeckClient {
  canHandleAuthentication: () => void
  getClaimsFromAccess: () => void
  handleRedirectCallback: () => void
  isAuthenticated: () => void
  signInWithRedirect: () => void
}

export interface CleeckTokenClaims {
  aud: string
  cid: string
  exp: number
  iat: number
  iss: string
  jti: string
  jtt: string
  resource_owner_metadata?: { [key: string]: string | number | boolean }
  scp: string[]
  sub: string
  tnt: string
  version: number
}

// export interface ProviderProps {
//   children: PropTypes.node
// }
