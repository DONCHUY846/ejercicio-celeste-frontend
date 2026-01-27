import { createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardLayout } from '../layouts/DashboardLayout'

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ location }) => {
    // Check if we have a token in localStorage (simplified check)
    // ideally we would use the auth context, but context injection in router requires more setup
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null

    if (!token) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: DashboardLayout,
})
