import { createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardLayout } from '../layouts/DashboardLayout'

export const Route = createFileRoute('/_protected')({
  // Protección base: requiere estar autenticado
  beforeLoad: ({ context, location }) => {
    if (typeof window === 'undefined') {
      return
    }
    const { isAuthenticated } = context.getAuthSnapshot()
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
  component: DashboardLayout,
})
