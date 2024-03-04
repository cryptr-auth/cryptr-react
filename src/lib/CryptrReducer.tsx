import { User } from './utils/cryptr.interfaces'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const CryptrReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZED':
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user: action.user as unknown as User | null,
        isLoading: false,
        error: undefined,
      }
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    default:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: undefined,
      }
  }
}

export default CryptrReducer
