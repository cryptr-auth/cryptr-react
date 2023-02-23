import React from "react";
import { render, screen } from '@testing-library/react'
import { renderIntoDocument } from "react-dom/test-utils";
import CryptrSignInWithDomainButton from "./CryptrSignInWithDomainButton";

describe('<SignInWithDomainButton/>', () => {
  const element = <CryptrSignInWithDomainButton/>

  test('it should be in document', () => {
    renderIntoDocument(element)

    const button = screen.getByTestId('CryptrSignInWithDomainButton')

    expect(button).toBeInTheDocument()
  })
})
