import { createContext } from 'react'
import initialCryptrState from './initialCryptrState'

const error = (...args) => {
  console.debug(args)
  throw new Error('You have to wrap your component in <CryptrContext.Provider>.')
}

const initialContext = {
  ...initialCryptrState,
  signinWithRedirect: error,
  signupWithRedirect: error,
  isAuthenticated: error,
  userAccountAccess: error,
  logOut: error,
  user: error,
  decoratedRequest: error,
  defaultScopes: error,
  getCurrentAccessToken: error,
}

const CryptrContext = createContext(initialContext)

export default CryptrContext
