import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CryptrAccountAccessButton from './CryptrAccountAccessButton'
import CryptrProvider from '../CryptrProvider'

const renderInProvider = (element) => {
  render(<CryptrProvider>{element}</CryptrProvider>)
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
