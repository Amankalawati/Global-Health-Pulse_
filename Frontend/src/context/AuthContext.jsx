// src/context/AuthContext.jsx → FINAL PERSISTENT LOGIN VERSION
import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // THIS IS THE MAGIC: Load user from localStorage on page load
  useEffect(() => {
    const savedUser = localStorage.getItem('ghp-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (userData) => {
    const userInfo = { ...userData, loggedIn: true }
    setUser(userInfo)
    localStorage.setItem('ghp-user', JSON.stringify(userInfo))   // ← SAVES TO BROWSER
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ghp-user')                          // ← CLEARS FROM BROWSER
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)