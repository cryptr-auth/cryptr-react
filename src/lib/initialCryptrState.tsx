// export type User = any; // eslint-disable-line @typescript-eslint/no-explicit-any

// /**
//  * The auth state which, when combined with the auth methods, make up the return object of the `useAuth0` hook.
//  */
// export interface AuthState {
//   error?: Error;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   user?: User;
// }

/**
 * The initial auth state.
 */
const initialCryptrState = {
  isAuthenticated: false,
  // In SSR mode the library will never check the session, so loading should be initialised as false
  isLoading: typeof window !== 'undefined',
  user: undefined,
  error: null,
}

export default initialCryptrState
