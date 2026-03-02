import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { changePassword } from '../api/change-password'
import { useAuth } from '../context/auth-context'
import type { ChangePasswordCredentials } from '../types'

export const useChangePassword = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: ChangePasswordCredentials) =>
      changePassword(credentials),
    onSuccess: () => {
      logout()
      navigate({ to: '/login' })
      toast.success('Contraseña actualizada', {
        description: 'Tu sesión ha sido cerrada por seguridad.',
      })
    },
    onError: (error: Error) => {
      toast.error('Error al cambiar contraseña', {
        description: error.message,
      })
    },
  })
}
