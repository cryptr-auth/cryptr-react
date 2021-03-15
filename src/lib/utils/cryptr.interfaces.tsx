import { Config } from "@cryptr/cryptr-spa-js/dist/types/interfaces";
export interface ProviderConfig extends Config{
  /* tslint:disable-next-line */
  onRedirectCallback: (claims: CryptrTokenClaims | null) => void;
  onLogOutCallback: () => void;
  defaultScopes: string;
}
export interface CryptrTokens {
  accessToken: string
}

export interface CryptrClient {
  canHandleAuthentication: () => void
  getClaimsFromAccess: () => void
  handleRedirectCallback: () => void
  isAuthenticated: () => void
  signInWithRedirect: () => void
}


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

// export interface ProviderProps {
//   children: PropTypes.node
// }
