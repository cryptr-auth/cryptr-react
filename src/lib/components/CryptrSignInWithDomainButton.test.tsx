import React from 'react'
import { screen } from '@testing-library/react'
import { renderIntoDocument } from 'react-dom/test-utils'
import CryptrSignInWithDomainButton from './CryptrSignInWithDomainButton'
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

const renderInProvider = (element) => {
  return <CryptrProvider {...config}>{element}</CryptrProvider>
}

describe('<SignInWithDomainButton/>', () => {
  const element = renderInProvider(<CryptrSignInWithDomainButton />)

  test('it should be in document', () => {
    renderIntoDocument(element)

    const button = screen.getByTestId('CryptrSignInWithDomainButton')

    expect(button).toBeInTheDocument()
  })
})
