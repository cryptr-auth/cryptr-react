import React from 'react'
import { render, screen } from '@testing-library/react'
import { CryptrProvider } from '..'
import CryptrSsoSignInButton from './CryptrSsoSignInButton'

const config = {
  audience: 'http://localhost:5000',
  cryptr_base_url: 'https://samly.howto:4443',
  tenant_domain: 'leanpay',
  client_id: '89daae8a-2b6d-4e60-bbfc-7668a4d41af0',
  default_redirect_uri: 'http://localhost:5000',
  default_locale: 'fr',
  telemetry: false,
}

const idpId = 'tenant_domain_slug'

const renderInProvider = (element) => {
  render(<CryptrProvider {...config}>{element}</CryptrProvider>)
}

describe('<SsoSignInButton />', () => {
  const ssoElement = <CryptrSsoSignInButton idpId={idpId} />

  test('it should mount with ', () => {
    renderInProvider(ssoElement)

    const cryptrSSoSignInButton = screen.getByTestId('CryptrSsoSignInButtton')

    expect(cryptrSSoSignInButton).toBeInTheDocument()
  })
})
