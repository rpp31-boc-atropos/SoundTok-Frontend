import React, { createContext, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

  //need to add authentication

  const [login, setLogin] = useState(false)
  const [user, setUser] = useState('visitor')

  const authContextValue = { login, setLogin, user, setUser }

  return <AuthContext.Provider value={authContextValue}>
    {children}
  </AuthContext.Provider>

}

const useAuth = () => React.useContext(AuthContext)

export { AuthContext, AuthProvider, useAuth }