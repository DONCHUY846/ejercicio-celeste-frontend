import type { RegisterCredentials, RegisterResponse } from '../types'
import { api } from '@/lib/api'

export const registerWithEmail = async (
  credentials: RegisterCredentials,
): Promise<RegisterResponse> => {
  return api('/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}
