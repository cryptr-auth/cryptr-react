import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CryptrSignUpButton from './CryptrSignUpButton'
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

describe('default <CryptrSignUpButton />', () => {
  const logoutElement = <CryptrSignUpButton />
  test('it should mount', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignUpButton')

    expect(cryptrLogOutButton).toBeInTheDocument()
  })

  test('it should mount a div', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignUpButton')

    expect(cryptrLogOutButton).toHaveTextContent('Sign up')
  })
})

describe('<CryptrSignUpButton autoHide={false}/>', () => {
  const logoutElement = <CryptrSignUpButton autoHide={false} />
  test('it should mount', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignUpButton')

    expect(cryptrLogOutButton).toBeInTheDocument()
  })

  test('it should mount a div', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignUpButton')

    expect(cryptrLogOutButton).toHaveTextContent('Sign up')
  })
})

describe('<CryptrSignUpButton autoHide={false}/> with text', () => {
  const text = 'Me déconnecter'
  const logoutElement = <CryptrSignUpButton autoHide={false} text={text} />

  test('it should mount', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignUpButton')

    expect(cryptrLogOutButton).toBeInTheDocument()
  })

  test('it should mount a div', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignUpButton')

    expect(cryptrLogOutButton).toHaveTextContent(text)
  })
})

describe('<CryptrSignUpButton autoHide={false}/> withClassName', () => {
  const className = 'Me déconnecter'
  const logoutElement = <CryptrSignUpButton autoHide={false} className={className} />

  test('it should mount', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignUpButton')

    expect(cryptrLogOutButton).toBeInTheDocument()
  })

  test('it should mount a div', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignUpButton')

    expect(cryptrLogOutButton).toHaveClass(className)
  })
})

describe('<CryptrSignUpButton autoHide={false}/> with style', () => {
  const style = { backgroundColor: '#c0c0c0' }
  const logoutElement = <CryptrSignUpButton autoHide={false} style={style} />

  test('it should mount', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignUpButton')

    expect(cryptrLogOutButton).toBeInTheDocument()
  })

  test('it should mount a div', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrSignUpButton')

    expect(cryptrLogOutButton).toHaveStyle(style)
  })
})
