# 📚 @cryptr/cryptr-react

> Cleeck SDK for React Single Page Applications using passwordless authentication

## Table of Content

- [📚 @cryptr/cryptr-react](#-cryptrcryptr-react)
  - [Table of Content](#table-of-content)
  - [Installation](#installation)
  - [Configuration](#configuration)
    - [CryptrConfig](#cryptrconfig)
    - [Cryptr Provider](#cryptr-provider)
  - [Cryptr Hook `useCryptr`](#cryptr-hook-usecryptr)
  - [Components](#components)
    - [SignInWithDomainButton](#signinwithdomainbutton)
    - [SignInWithEmailButton](#signinwithemailbutton)
  - [Deprecations](#deprecations)
    - [Since 1.3.0](#since-130)


## Installation

Current version `1.2.0`

```bash
//npm
npm install @cryptr/cryptr-react

//npm
yarn add @cryptr/cryptr-react
```

## Configuration

### CryptrConfig

Here is an example of configuration that will be necessary to implement our solution

```javascript
const config = {
  audience: process.env.REACT_APP_CRYPTR_AUDIENCE,
  cryptr_base_url: process.env.REACT_APP_CRYPTR_BASE_URL,
  tenant_domain: process.env.REACT_APP_CRYPTR_TENANT_DOMAIN,
  client_id: process.env.REACT_APP_CRYPTR_CLIENT_ID,
  default_redirect_uri: process.env.REACT_APP_CRYPTR_DEFAULT_REDIRECT_URI,
  default_locale: process.env.REACT_APP_CRYPTR_DEFAULT_LOCALE || 'en',
  telemetry: process.env.REACT_APP_CRYPTR_TELEMETRY == 'true',
  dedicated_server: process.env.REACT_APP_CRYPTR_DEDICATED_SERVER == 'true',
  fixed_pkce: process.env.REACT_APP_CRYPTR_FIXED_PKCE == 'true',
  default_slo_after_revoke: process.env.REACT_APP_CRYPTR_DEFAULT_SLO_AFTER_REVOKE == 'true',
}
```

Explanation of config

| key                         | Required/Optional     | type          | Default | Description                                          |
| --------------------------- | --------------------- | ------------- | ------- | ---------------------------------------------------- |
| `tenant_domain`             | **required**              | string slug   | -       | Reference to your company entity                     |
| `client_id`                 | **required**              | uuid          | -       | Reference to your front app id                       |
| `audience`                  | **required**              | string URL    | -       | Root URL of your front app                           |
| `default_redirect_uri`      | **required**              | string URL    | -       | Desired redirection URL after authentication process |
| `cryptr_base_url`           | **required**              | string URL    | -       | URL of your Cryptr service                           |
| `default_slo_after_revoke`  | **required**(since 1.2.0) | boolean       |         | Defines if SLO has to be done on SSO logout process  |
| `default_locale`            | Optional                  | string locale | `en`    | -                                                    |
| `dedicated_server`          | Optional                  | boolean       | false   | Contact Cryptr Team to set properly                  |
| `fixed_pkce`                | Optional                  | boolean       | false   | Contact Cryptr Team to set properly                  |
| `telemetry`                 | Optional                  | boolean       | false   | Set to `true` if debug                               |

⚠️ `fixed_pkce` will be removed in the future `1.4.0` release version

### Cryptr Provider

After creating your config, create your `CryptrProvider` that should encapsulate your App content.

Here is a quick sample (also see our sample [(`src/examples/App.tsx`)](https://github.com/cryptr-auth/cryptr-react/blob/develop/src/examples/App.tsx))

```typescript
import React, { ReactElement } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// import from cryptr SDK
import { CryptrProvider } from '@crypptr/cryptr-react'

const config = {/*... your config */}

const AppContainer = (): ReactElement => {
  return (
    <Router>
      // your routes
    </Router>
  )
}

const App = (): ReactElement => {
  <CryptrProvider {...config} >
    <AppContainer />
  </CryptrProvider>
}

return default App
```

Then you will be able to handle cryptr session through our hook and our components

## Cryptr Hook `useCryptr`

On any React element child of the `CryptrProvider` you'll be able to use our hook `useCryptr` for your Cryptr usage.

Here is a quick example

```typescript
import React, { ReactElement } from 'react'
import { useCryptr } from '@cryptr/cryptr-react'

const MyComponent = (): ReactElement => {
  const { isAuthenticated, isLoading } = useCryptr()

  if (isLoading) {
    return <span>Cryptr is processing authentication</span>
  }

  if (isAuthenticated()) {
    return <span>A Cryptr session is live</span>
  } else {
    return <span>User is not authenticated</span>
  }
}

export default MyComponent
```

Here is a quick list of tools from our hook

| Name                                                | Purpose                                                                                                                                       |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `isLoading`                                         | Cryptr SDK is currently looking for a active authentication (after login or refresh)                                                          |
| `isAuthenticated`                                   | Cryptr SDK has a live Access token ➡️ a user is logged in                                                                                     |
| `user`                                              | Returns the user objecgt containing all keys from Cryptr ID Token                                                                             |
| `logOut`                                            | Asks to Cryptr SDK to run the session log out process                                                                                         |
| `decoratedRequest(axiosConfig: AxiosRequestConfig)` | This method based on axios will decorate the request to the desired endpoint with the current Access Token as **Authorization Bearer Header** |

There are more but major features are just above

## Components

We embedded some components in this SDK to help your integration. Mainly it's button components and can still be configured as you wish (eg: `text`, `className`, `style` ...)

### SignInWithDomainButton

_When you either know which is the entity of the user trying to connect or if you prefer to let him type his email on our gateway_

```typescript
import React, { ReactElement } from 'react'
import { SignInWithDomainButton } from '@cryptr/cryptr-react'

const LoginComponent = (): ReactElement => {
  return <SignInWithDomainButton domain={'nullable-entity-domain'} />
}

export default LoginComponent
```

> 💡 `domain` is optional if you do not know current user's context

### SignInWithEmailButton

_When you already asked the user his email address_

```typescript
import React, { ReactElement } from 'react'
import { SignInWithEmailButton } from '@cryptr/cryptr-react'

const LoginComponent = (): ReactElement => {
  return <SignInWithEmailButton email={'not-nullable-john@doe.com'} />
}

export default LoginComponent
```

## Deprecations

### Since 1.3.0

- Components
  - ~~`SignInButton`~~  -> `SignInWithDomain`
  - ~~`SignUpButton`~~  -> `SignInWithDomain`
  - ~~`SsoGatewayButton`~~  -> `SignInWithDomain`
  - ~~`SsoSignInButton`~~  -> `SignInWithDomain`
- Crpytr Hooks
  - ~~`signinWithRedirect`~~
  - ~~`signupWithRedirect`~~
  - ~~`signinWithSSO`~~
  - ~~`signinWithSSOGateway`~~
