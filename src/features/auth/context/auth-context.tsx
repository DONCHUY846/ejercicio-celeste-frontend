import React, { createContext, useContext, useEffect, useState } from 'react'
import { loginWithEmail } from '../api/login'
import { registerWithEmail } from '../api/register'
import type { LoginCredentials, RegisterCredentials, User } from '../types'

const initialToken =
  typeof window !== 'undefined' ? localStorage.getItem('token') : null
const initialUser =
  typeof window !== 'undefined'
    ? (JSON.parse(localStorage.getItem('user') ?? 'null') as User | null)
    : null
let authSnapshot: { user: User | null; token: string | null } = {
  user: initialUser,
  token: initialToken,
}

export function getAuthSnapshot(): {
  isAuthenticated: boolean
  user: User | null
} {
  return {
    isAuthenticated: !!authSnapshot.token,
    user: authSnapshot.user,
  }
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const storedUser =
      typeof window !== 'undefined' ? localStorage.getItem('user') : null

    if (storedToken && storedUser) {
      setToken(storedToken)
      const parsed = JSON.parse(storedUser) as User
      setUser(parsed)
      authSnapshot = { token: storedToken, user: parsed }
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials) => {
    const data = await loginWithEmail(credentials)

    setToken(data.access_token)
    setUser(data.user)
    authSnapshot = { token: data.access_token, user: data.user }

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    await registerWithEmail(credentials)
    // No login here, user must verify email first
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    authSnapshot = { token: null, user: null }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
