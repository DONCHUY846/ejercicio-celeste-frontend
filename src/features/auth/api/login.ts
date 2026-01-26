import type { AuthResponse, LoginCredentials } from '../types'

const API_URL = 'http://localhost:8000/api'

export const loginWithEmail = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Error al iniciar sesión')
  }

  return response.json()
}
