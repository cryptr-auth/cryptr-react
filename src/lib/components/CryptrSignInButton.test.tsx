import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CryptrSignInButton from './CryptrSignInButton'
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

describe('default <CryptrSignInButton />', () => {
  const logoutElement = <CryptrSignInButton />
  test('it should mount', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignInButton')

    expect(cryptrLogOutButton).toBeInTheDocument()
  })

  test('it should mount a div', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignInButton')

    expect(cryptrLogOutButton).toHaveTextContent('Sign in')
  })
})

describe('<CryptrSignInButton autoHide={false}/>', () => {
  const logoutElement = <CryptrSignInButton autoHide={false} />
  test('it should mount', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignInButton')

    expect(cryptrLogOutButton).toBeInTheDocument()
  })

  test('it should mount a div', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignInButton')

    expect(cryptrLogOutButton).toHaveTextContent('Sign in')
  })
})

describe('<CryptrSignInButton autoHide={false}/> with text', () => {
  const text = 'Me déconnecter'
  const logoutElement = <CryptrSignInButton autoHide={false} text={text} />

  test('it should mount', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignInButton')

    expect(cryptrLogOutButton).toBeInTheDocument()
  })

  test('it should mount a div', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignInButton')

    expect(cryptrLogOutButton).toHaveTextContent(text)
  })
})

describe('<CryptrSignInButton autoHide={false}/> withClassName', () => {
  const className = 'Me déconnecter'
  const logoutElement = <CryptrSignInButton autoHide={false} className={className} />

  test('it should mount', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignInButton')

    expect(cryptrLogOutButton).toBeInTheDocument()
  })

  test('it should mount a div', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignInButton')

    expect(cryptrLogOutButton).toHaveClass(className)
  })
})

describe('<CryptrSignInButton autoHide={false}/> with style', () => {
  const style = { backgroundColor: '#c0c0c0' }
  const logoutElement = <CryptrSignInButton autoHide={false} style={style} />

  test('it should mount', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignInButton')

    expect(cryptrLogOutButton).toBeInTheDocument()
  })

  test('it should mount a div', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignInButton')

    expect(cryptrLogOutButton).toHaveStyle(style)
  })
})
