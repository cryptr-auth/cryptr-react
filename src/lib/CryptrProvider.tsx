import React, { useEffect, useReducer, useState, useCallback, useRef } from 'react'
import Client from '../../node_modules/@cryptr/cryptr-spa-js/dist/types/client'
import CryptrContext from './CryptrContext'
import initialCryptrState from './initialCryptrState'
import CryptrReducer from './CryptrReducer'
import { CryptrTokenClaims, ProviderConfig, User } from './utils/cryptr.interfaces'
import { Config, SsoSignOptsAttrs } from '@cryptr/cryptr-spa-js/dist/types/interfaces'
import CryptrSpa from '@cryptr/cryptr-spa-js'
import { AxiosRequestConfig } from 'axios'

/**
 * The default action to perform after authentication:
 *
 * *Removes query params from history state*
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
 * The default action after successful logout:
 *
 * *Popup alert informing user is logged out + reload the page*
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
      cryptrClient.logOut(logOutCallback)
    },
    // eslint-disable-next-line
    [cryptrClient],
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
        isAuthenticated: () => state.isAuthenticated,
        logOut: async (callback?: () => void, targetUrl?: string, sloAfterRevoke?: boolean) =>
          cryptrClient.logOut(
            callback || logOutCallback,
            undefined,
            targetUrl,
            sloAfterRevoke || config.default_slo_after_revoke,
          ),
        signInWithEmail: (email: string, options?: SsoSignOptsAttrs) =>
          cryptrClient.signInWithEmail(email, options),
        signInWithDomain: (organizationDomain?: string, options?: SsoSignOptsAttrs) =>
          cryptrClient.signInWithDomain(organizationDomain, options),
        user: () => state.user,
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
