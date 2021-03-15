import React, { useEffect, useReducer, useState, useCallback, useRef } from 'react'
import CleeckSpa from '@cryptr/cryptr-spa-js'
// import PropTypes from 'prop-types'
import Client from '../../node_modules/@cryptr/cryptr-spa-js/dist/types/client'
import CryptrContext from './CryptrContext'
import initialCryptrState from './initialCryptrState'
import CryptrReducer from './CryptrReducer'

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, react/prop-types
const CryptrProvider = ({ children, ...options }): JSX.Element => {
  const [config] = useState({
    ...options,
    tenant_domain: options.tenant_domain,
    client_id: options.client_id,
    cleeck_base_url: options.cleeck_base_url,
    locale: options.locale || 'en',

    default_redirect_uri: options.redirect_uri || window.location.origin,
    onRedirectCallback: options.onRedirectCallback || DEFAULT_REDIRECT_CALLBACK,

    audience: options.audience || window.location.origin,
    onLogOutCallback: options.onlogOutCallback || DEFAULT_LOGOUT_CALLBACK,
    defaultScopes: options.defaultScopes || DEFAULT_SCOPE,
    telemetry: false,
  })

  const [cryptrClient] = useState<Client>(new CleeckSpa.client(config))
  const [accountPopup, setAccountPopup] = useState<Window | null>()
  const [state, dispatch] = useReducer(CryptrReducer, initialCryptrState)

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
          const claims = cryptrClient.getClaimsFromAccess(tokens.accessToken)
          config.onRedirectCallback(claims)
        } else if (cryptrClient && (await cryptrClient.canHandleInvitation())) {
          await cryptrClient.handleInvitationState()
        } else {
          console.log('not hanling redirection')
        }
      } catch (error) {
        console.error(error)
        dispatchNewState({ type: 'ERROR', error: error.message })
      } finally {
        if (cryptrClient !== undefined) {
          const user = cryptrClient.getUser()
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

  useEventListener(CleeckSpa.events.REFRESH_EXPIRED, popupHandler)
  useEventListener(CleeckSpa.events.REFRESH_INVALID_GRANT, popupHandler)

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
        signinWithRedirect: (scope: string = DEFAULT_SCOPE) =>
          cryptrClient.signInWithRedirect(scope),
        signupWithRedirect: (scope: string = DEFAULT_SCOPE) =>
          cryptrClient.signUpWithRedirect(scope),
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
