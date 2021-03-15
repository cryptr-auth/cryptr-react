import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CryptrLogOutButton from './CryptrLogOutButton'
import CryptrProvider from '../CryptrProvider'

const renderInProvider = (element) => {
  render(<CryptrProvider>{element}</CryptrProvider>)
}

const DEFAULT_LOGOUT_CALLBACK = () => {
  console.debug('logged out')
}

describe('default <CryptrLogOutButton />', () => {
  const logoutElement = <CryptrLogOutButton callback={DEFAULT_LOGOUT_CALLBACK} />
  test('it should mount', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrLogOutButton')

    expect(cryptrLogOutButton).toBeInTheDocument()
  })

  test('it should mount a div', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrLogOutButton')

    expect(cryptrLogOutButton).toBeEmptyDOMElement()
  })
})

describe('<CryptrLogOutButton autoHide={false}/>', () => {
  const logoutElement = (
    <CryptrLogOutButton
      callback={() => {
        console.debug('logged out')
      }}
      autoHide={false}
    />
  )
  test('it should mount', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrLogOutButton')

    expect(cryptrLogOutButton).toBeInTheDocument()
  })

  test('it should mount a div', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrLogOutButton')

    expect(cryptrLogOutButton).toHaveTextContent('Log out')
  })
})

describe('<CryptrLogOutButton autoHide={false}/> with text', () => {
  const text = 'Me déconnecter'
  const logoutElement = (
    <CryptrLogOutButton callback={DEFAULT_LOGOUT_CALLBACK} autoHide={false} text={text} />
  )

  test('it should mount', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrLogOutButton')

    expect(cryptrLogOutButton).toBeInTheDocument()
  })

  test('it should mount a div', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrLogOutButton')

    expect(cryptrLogOutButton).toHaveTextContent(text)
  })
})

describe('<CryptrLogOutButton autoHide={false}/> withClassName', () => {
  const className = 'Me déconnecter'
  const logoutElement = (
    <CryptrLogOutButton
      callback={() => {
        'logged out'
      }}
      autoHide={false}
      className={className}
    />
  )

  test('it should mount', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrLogOutButton')

    expect(cryptrLogOutButton).toBeInTheDocument()
  })

  test('it should mount a div', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrLogOutButton')

    expect(cryptrLogOutButton).toHaveClass(className)
  })
})

describe('<CryptrLogOutButton autoHide={false}/> with style', () => {
  const style = { backgroundColor: '#c0c0c0' }
  const logoutElement = (
    <CryptrLogOutButton callback={DEFAULT_LOGOUT_CALLBACK} autoHide={false} style={style} />
  )

  test('it should mount', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrLogOutButton')

    expect(cryptrLogOutButton).toBeInTheDocument()
  })

  test('it should mount a div', () => {
    renderInProvider(logoutElement)

    const cryptrLogOutButton = screen.getByTestId('CryptrLogOutButton')

    expect(cryptrLogOutButton).toHaveStyle(style)
  })
})
