import type { AuthResponse, LoginCredentials } from '../types'
import { api } from '@/lib/api'

export const loginWithEmail = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  return api('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}
