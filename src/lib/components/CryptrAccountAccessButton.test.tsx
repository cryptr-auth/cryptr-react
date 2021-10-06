import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CryptrAccountAccessButton from './CryptrAccountAccessButton'
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
  render(<CryptrProvider {...config}>{element}</CryptrProvider>)
}

describe('<CryptrAccountAccessButton />', () => {
  const accountElement = <CryptrAccountAccessButton />
  test('it should mount', () => {
    renderInProvider(accountElement)

    const cryptrAccountAccessButton = screen.getByTestId('CryptrAccountAccessButton')

    expect(cryptrAccountAccessButton).toBeInTheDocument()
  })

  test('it should render signin button', () => {
    renderInProvider(accountElement)

    expect(screen.getByTestId('CryptrSignInButton')).not.toBeNull()
  })
})

describe('<CryptrAccountAccessButton /> as button', () => {
  const accountElement = <CryptrAccountAccessButton isWidget={false} />
  test('it should mount', () => {
    renderInProvider(accountElement)

    const cryptrAccountAccessButton = screen.getByTestId('CryptrAccountAccessButton')

    expect(cryptrAccountAccessButton).toBeInTheDocument()
  })

  test('it should render signin button', () => {
    renderInProvider(accountElement)

    expect(screen.getByTestId('CryptrSignInButton')).not.toBeNull()
  })
})

describe('<CryptrAccountAccessButton/> with signup sign type', () => {
  const accountElement = <CryptrAccountAccessButton defaultSignType="signup" />

  test('it should mount', () => {
    renderInProvider(accountElement)

    const cryptrAccountAccessButton = screen.getByTestId('CryptrAccountAccessButton')

    expect(cryptrAccountAccessButton).toBeInTheDocument()
  })

  test('it should render signin button', () => {
    renderInProvider(accountElement)

    expect(screen.getByTestId('CryptrSignUpButton')).not.toBeNull()
  })
})
