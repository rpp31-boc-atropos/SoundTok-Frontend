import React, { createContext, useState } from 'react'

const AuthContext = createContext({})

const AuthProvider = (props) => {

  //need to add authentication

  const [login, setLogin] = useState(false)
  const [user, setUser] = useState('visitor')

  const authContextValue = { login, setLogin, user, setUser }

  return <AuthContext.Provider value={authContextValue} {...props} />
}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }