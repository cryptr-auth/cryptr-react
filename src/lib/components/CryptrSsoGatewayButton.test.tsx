import React, { ReactElement } from 'react'
import CryptrSsoGatewayButton from './CryptrSsoGatewayButton'
import { render, screen } from '@testing-library/react'
import CryptrProvider from '../CryptrProvider'



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

const renderInProvider = (element: ReactElement) => {
  return render(<CryptrProvider {...config}>{element}</CryptrProvider>)
}

describe('<SsoSignInButton />', () => {
  const ssoElement = <CryptrSsoGatewayButton idpIds={[idpId]} />

  test('it should mount with ', () => {
    renderInProvider(ssoElement)

    const cryptrSSoSignInButton = screen.getByTestId('CryptrSsoGatewayButton')

    expect(cryptrSSoSignInButton).toBeInTheDocument()
  })
})
