import { AxiosPromise } from 'axios'
import { createContext } from 'react'
import initialCryptrState from './initialCryptrState'
import { ProviderConfig, User } from './utils/cryptr.interfaces'

const error = (...args) => {
  console.debug(args)
  throw new Error('You have to wrap your component in <CryptrProvider>.')
}

const initialContext = {
  ...initialCryptrState,
  signinWithRedirect: error,
  signupWithRedirect: error,
  signinWithSSO: error,
  isAuthenticated: error,
  userAccountAccess: error,
  logOut: error,
  user: error as unknown as () => User | null,
  decoratedRequest: error as unknown as AxiosPromise<unknown> | null,
  config: error as unknown as () => ProviderConfig,
  defaultScopes: error,
  getCurrentAccessToken: error,
  getCurrentIdToken: error,
}

const CryptrContext = createContext(initialContext)

export default CryptrContext
