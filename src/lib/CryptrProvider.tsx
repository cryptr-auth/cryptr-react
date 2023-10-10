import React, { useEffect, useReducer, useState, useCallback, useRef } from 'react'
// import PropTypes from 'prop-types'
import Client from '../../node_modules/@cryptr/cryptr-spa-js/dist/types/client'
import CryptrContext from './CryptrContext'
import initialCryptrState from './initialCryptrState'
import CryptrReducer from './CryptrReducer'
import { CryptrTokenClaims, ProviderConfig, User } from './utils/cryptr.interfaces'
import { Config, SsoSignOptsAttrs } from '@cryptr/cryptr-spa-js/dist/types/interfaces'
import CryptrSpa from '@cryptr/cryptr-spa-js'
import { AxiosRequestConfig } from 'axios'

/**
 * Define a default action to perform after authentication
 * Basically it's only removing query params from the redirection.
 * @category Defaults
 * */
const DEFAULT_REDIRECT_CALLBACK = () => {
  try {
    window.history.replaceState({}, document.title, window.location.pathname)
  } catch (error) {
    console.error(error)
  }
}

/**
 * Defines the default action after successful logout.
 *
 * Basically it's alerting user that's logged out and reload the page
 * @category Defaults
 */
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
    default_locale: options.default_locale ?? 'en',
    default_redirect_uri: options.default_redirect_uri || window.location.origin,
    onRedirectCallback: options.onRedirectCallback || DEFAULT_REDIRECT_CALLBACK,
    onLogOutCallback: options.onLogOutCallback || DEFAULT_LOGOUT_CALLBACK,
    defaultScopes: options.defaultScopes || DEFAULT_SCOPE,
    telemetry: options.telemetry || false,
    dedicated_server: options.dedicated_server || false,
    default_slo_after_revoke: options.default_slo_after_revoke ?? false,
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, react/prop-types
const CryptrProvider = (props: ProviderProps): JSX.Element => {
  const { children, ...options } = props
  const [config] = useState<ProviderConfig>(prepareConfig(options))

  const [cryptrClient] = useState<Client>(new CryptrSpa.client(config))
  const [accountPopup, setAccountPopup] = useState<Window | null>()
  const [state, dispatch] = useReducer(CryptrReducer, initialCryptrState)

  const logOutCallback = () => {
    try {
      dispatchNewState({ type: 'INITIALIZED', isAuthenticated: false, user: null })
    } catch (error) {
      console.error('logoutCallback error')
      console.error(error)
    }
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
    dispatch(newState)
  }

  useEffect(() => {
    const configFn = async () => {
      try {
        if (cryptrClient && cryptrClient.canHandleAuthentication()) {
          const tokens = await cryptrClient.handleRedirectCallback()
          const claims = cryptrClient.getClaimsFromAccess(
            tokens.accessToken,
          ) as unknown as CryptrTokenClaims | null
          config.onRedirectCallback(claims)
        } else if (cryptrClient && cryptrClient.canRefresh(cryptrClient.getRefreshStore())) {
          await cryptrClient.handleRefreshTokens()
        } else if (cryptrClient && cryptrClient.canHandleInvitation()) {
          await cryptrClient.handleInvitationState()
        } else {
          console.log('not hanling redirection')
        }
      } catch (error) {
        console.error('catched error', error)
        if (error instanceof Error) {
          dispatchNewState({ type: 'ERROR', error: error.message })
        } else {
          dispatchNewState({ type: 'ERROR', error: error })
        }
      } finally {
        if (cryptrClient !== undefined) {
          const user = cryptrClient.getUser() as unknown as User | null
          const isAuthenticated = await cryptrClient.isAuthenticated()
          dispatchNewState({ type: 'INITIALIZED', isAuthenticated, user })
        }
      }
    }
    configFn()
  }, [config, cryptrClient])

  const handleUserAccountAccess = () => {
    cryptrClient.userAccountAccess().then((data) => {
      if (data !== undefined && data != null) {
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
        logOut: async (callback?: () => void, targetUrl?: string, sloAfterRevoke?: boolean) =>
          cryptrClient.logOut(callback || logOutCallback, undefined, targetUrl, sloAfterRevoke || config.default_slo_after_revoke),
        signinWithRedirect: (scope?: string, redirectUri?: string, locale?: string) =>
          cryptrClient.signInWithRedirect(scope, redirectUri, locale),
        signupWithRedirect: (scope?: string, redirectUri?: string, locale?: string) =>
          cryptrClient.signUpWithRedirect(scope, redirectUri, locale),
        signinWithSSO: (idpId: string, options?: SsoSignOptsAttrs) =>
          cryptrClient.signInWithSSO(idpId, options),
        signInWithSSOGateway: (idpIds: string[], options?: SsoSignOptsAttrs) =>
          cryptrClient.signInWithSSOGateway(idpIds, options),
        signInWithEmail: (email: string, options?: SsoSignOptsAttrs) =>
          cryptrClient.signInWithEmail(email, options),
        signInWithDomain: (organizationDomain?: string, options?: SsoSignOptsAttrs) =>
          cryptrClient.signInWithDomain(organizationDomain, options),
        userAccountAccess: () => handleUserAccountAccess(),
        user: () => {
          return state.user
        },
        decoratedRequest: (axiosConfig: AxiosRequestConfig) => {
          return cryptrClient.decoratedRequest(axiosConfig)
        },
        config: () => config,
        defaultScopes: () => config.defaultScopes,
        getCurrentAccessToken: () => cryptrClient.getCurrentAccessToken(),
        getCurrentIdToken: () => cryptrClient.getCurrentIdToken(),
      }}
    >
      {children}
    </CryptrContext.Provider>
  )
}

export default CryptrProvider
