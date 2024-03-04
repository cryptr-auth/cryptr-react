import { ResponsePromise } from 'ky'
import { createContext } from 'react'
import initialCryptrState from './initialCryptrState'
import { ProviderConfig, User } from './utils/cryptr.interfaces'

const error = (...args) => {
  console.debug(args)
  throw new Error('You have to wrap your component in <CryptrProvider>.')
}

const initialContext = {
  ...initialCryptrState,
  signInWithDomain: error,
  signInWithEmail: error,
  isAuthenticated: error,
  logOut: error,
  user: error as unknown as () => User | null,
  decoratedRequest: error as unknown as (
    url: string,
    kyOptions?: object | undefined,
  ) => ResponsePromise,
  config: error as unknown as () => ProviderConfig,
  defaultScopes: error,
  getCurrentAccessToken: error,
  getCurrentIdToken: error,
}
/**
 * Context that gives you the current Cryptr state and possible hooks
 * @name Cryptr Context
 */
const CryptrContext = createContext(initialContext)

export default CryptrContext
