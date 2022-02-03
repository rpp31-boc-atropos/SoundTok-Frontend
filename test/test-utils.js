//Create customized render to incorporate router and context providers

import React, { useState } from 'react'
import { render } from '@testing-library/react'
import { AuthProvider } from '../src/contexts/AuthContext'
import { MemoryRouter } from "react-router-dom";

const Providers = ({ children }) => {

  const [login, setLogin] = useState(false)
  const [user, setUser] = useState('visitor')

  const authContextValue = { login, setLogin, user, setUser }

  return (
    <AuthProvider value={authContextValue}>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </AuthProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }