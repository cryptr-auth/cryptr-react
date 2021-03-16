import React, { useEffect, useReducer, useState, useCallback, useRef } from 'react'
import CryptrSpa from '@cryptr/cryptr-spa-js'
// import PropTypes from 'prop-types'
import Client from '../../node_modules/@cryptr/cryptr-spa-js/dist/types/client'
import CryptrContext from './CryptrContext'
import initialCryptrState from './initialCryptrState'
import CryptrReducer from './CryptrReducer'
import { CryptrTokenClaims, ProviderConfig, User } from './utils/cryptr.interfaces'
import { Config } from '@cryptr/cryptr-spa-js/dist/types/interfaces'

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () => {
  try {
    window.history.replaceState({}, document.title, window.location.pathname)
  } catch (error) {
    console.error(error)
  }
}

const DEFAULT_LOGOUT_CALLBACK = () => {
  alert('you are logged out')
  window.location.reload()
}

const DEFAULT_SCOPE = 'email profile openid'

interface ProviderOptions extends Config {
  onRedirectCallback?: (claims: CryptrTokenClaims | null) => void
  onLogOutCallback?: () => void
  defaultScopes?: string
}
interface ProviderProps extends ProviderOptions {
  children: JSX.Element
}

const prepareConfig = (options: ProviderOptions): ProviderConfig => {
  return {
    ...options,
    tenant_domain: options.tenant_domain,
    client_id: options.client_id,
    audience: options.audience || window.location.origin,
    cryptr_base_url: options.cryptr_base_url,
    default_locale: options.default_locale || 'en',

    default_redirect_uri: options.default_redirect_uri || window.location.origin,
    onRedirectCallback: options.onRedirectCallback || DEFAULT_REDIRECT_CALLBACK,

    onLogOutCallback: options.onLogOutCallback || DEFAULT_LOGOUT_CALLBACK,
    defaultScopes: options.defaultScopes || DEFAULT_SCOPE,
    telemetry: false,
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, react/prop-types
const CryptrProvider = ( props: ProviderProps): JSX.Element => {
  const { children, ...options} = props
  const [config] = useState<ProviderConfig>(prepareConfig(options))

  const [cryptrClient] = useState<Client>(new CryptrSpa.client(config))
  const [accountPopup, setAccountPopup] = useState<Window | null>()
  const [state, dispatch] = useReducer(CryptrReducer, initialCryptrState)
  // console.debug(CryptrSpa.version)

  const logOutCallback = () => {
    dispatchNewState({ type: 'INITIALIZED', isAuthenticated: false, user: null })
    config.onLogOutCallback()
  }

  const popupHandler = useCallback(
    () => {
      accountPopup?.close()
      cryptrClient.logOut(logOutCallback)
    },
    // eslint-disable-next-line
    [cryptrClient, accountPopup],
  )

  const dispatchNewState = (newState) => {
    console.log(newState)
    dispatch(newState)
  }


  useEffect(() => {
    const configFn = async () => {
      try {
        if (cryptrClient && (await cryptrClient.canHandleAuthentication())) {
          const tokens = await cryptrClient.handleRedirectCallback()
          const claims = cryptrClient.getClaimsFromAccess(tokens.accessToken) as unknown as CryptrTokenClaims | null
          config.onRedirectCallback(claims)
        } else if (cryptrClient &&  cryptrClient.canRefresh(cryptrClient.getRefreshStore())) {
          // console.log("should refresh")
          await cryptrClient.handleRefreshTokens()
        } else if (cryptrClient &&  cryptrClient.canHandleInvitation()) {
          await cryptrClient.handleInvitationState()
        } else {
          console.log('not hanling redirection')
        }
      } catch (error) {
        console.error(error)
        dispatchNewState({ type: 'ERROR', error: error.message })
      } finally {
        if (cryptrClient !== undefined) {
          const user = cryptrClient.getUser() as unknown as User | null
          const isAuthenticated = await cryptrClient.isAuthenticated()
          // Quick fix: maybe need spa-js improve
          // cryptrClient.refreshTokens()
          dispatchNewState({ type: 'INITIALISED', isAuthenticated, user })
        }
      }
    }
    configFn()
  }, [config, cryptrClient])

  const handleUserAccountAccess = () => {
    cryptrClient.userAccountAccess().then((data) => {
      if (data !== undefined) {
        const popupHeight = 935
        const popupwidth = 915
        const popupParams = `location=yes,height=${popupHeight},width=${popupwidth},scrollbars=yes,status=yes`
        setAccountPopup(window.open(data.data.data.url, '_blank', popupParams))
      }
    })
  }

  const useEventListener = (eventName: string, handler, element = window) => {
    const savedHandler = useRef(handler)

    useEffect(() => {
      savedHandler.current = handler
    })

    useEffect(() => {
      const isSupported = element && element.addEventListener
      if (!isSupported) return

      const eventListener = (event) => {
        if (savedHandler !== undefined) {
          savedHandler.current(event)
        }
      }
      element.addEventListener(eventName, eventListener)
      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    }, [eventName, element])
  }

  useEventListener(CryptrSpa.events.REFRESH_EXPIRED, popupHandler)
  useEventListener(CryptrSpa.events.REFRESH_INVALID_GRANT, popupHandler)

  if (cryptrClient === undefined) {
    return children
  }

  return (
    <CryptrContext.Provider
      data-testid="CryptrProvider"
      value={{
        ...state,
        isAuthenticated: () => {
          return state.isAuthenticated
        },
        logOut: () => cryptrClient.logOut(logOutCallback),
        signinWithRedirect: (scope?: string, locale?: string, redirectUri?: string) =>
          cryptrClient.signInWithRedirect(scope, redirectUri, locale),
        signupWithRedirect: (scope?: string, locale?: string, redirectUri?: string) =>
          cryptrClient.signUpWithRedirect(scope, redirectUri, locale),
        userAccountAccess: () => handleUserAccountAccess(),
        user: () => {
          return state.user
        },
        decoratedRequest: (config) => cryptrClient.decoratedRequest(config),
        defaultScopes: () => config.defaultScopes,
        getAccessTokenSilently: () => cryptrClient.getCurrentAccessToken(),
      }}
    >
      {children}
    </CryptrContext.Provider>
  )
}

export default CryptrProvider
