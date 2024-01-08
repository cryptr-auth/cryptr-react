import { useContext } from 'react'
import CryptrContext from './CryptrContext'

/**
 * @function LogOutFunction
 * @category Hook functions
 * @async
 * @param {function} [callback] - Callback function executed when logout succeeded
 * @param {string} [targetUrl] - Specific URL to redirect after logout
 * @param {boolean} [sloAfterRevoke=false] - If you want to do or not the SLO process after token revokation
 */

/**
 * @function SignInWithEmailFunction
 * @category Hook functions
 *
 * @param {string} email - The email of the User you want to authenticate
 * @param {SsoSignOptsAttrs} [options] - Specific options if needed
 */

/**
 * @function SignInWithDomainFunction
 * @category Hook functions
 *
 * @param {string} [domain] - The domain of the organization you want to use for this authentication process
 * @param {SsoSignOptsAttrs} [options] - Specific options if needed
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
 /**
 * @name Cryptr Hooks
 *
 * @prop {function} isAuthenticated - Returns `true` if there is an active session
 * @prop {boolean} isLoading - Returns `true` if there is a Cryptr authentication process in progress
 * @prop {LogOutFunction} logOut - Initiates the log out process
 * @prop {function} user - Function that returns a User if there is an active session
 * @prop {SignInWithEmailFunction} signInWithEmail - Initiates a sign in process while providing the user's email
 * @prop {SignInWithDomainFunction} signInWithDomain - Initiates a sign in process while providing the organization's domain if known
 * @prop {function} decorateRequest - Function that automatically decorate an `axios` request with the current session access token
 * @prop {function} config - Function that returns the current config
 * @prop {function} getCurrentAccessToken - Function that returns the current access token if there is an active session. Usefull if you want to process your own decoration process with your back-end.
 * @prop {function} getCurrentIdToken - Function that returns the current id token if there is an active session
 *
 * @example
 *
 * import { useCryptr } from '@cryptr/cryptr-react'
 *
 * @example <caption>Then when you want to connect user by his email</caption>
 * const { signInWithEmail } = useCryptr()
 * //...
 * signInWithEmail('john@company.com')
 *
 * @example <caption>When you want to get current active session's access token</caption>
 * const { getCurrentAccessToken } = useCryptr()
 * //...
 * getCurrentAccessToken() // "eyJ..."
 *
 * @example <caption>When you want to initiate a logout process</caption>
 * const { logOut } = useCryptr()
 * //...
 * logOut()
 */
const useCryptr = () => useContext(CryptrContext)

export default useCryptr
