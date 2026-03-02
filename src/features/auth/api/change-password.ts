import type { ChangePasswordCredentials } from '../types'
import { api } from '@/lib/api'

export const changePassword = async (
  credentials: ChangePasswordCredentials,
): Promise<{ message: string }> => {
  return api('/change-password', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}
