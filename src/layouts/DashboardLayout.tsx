import { useEffect } from 'react'
import { Outlet, useNavigate } from '@tanstack/react-router'
import { Sidebar } from './Sidebar'

export const DashboardLayout = () => {
  const navigate = useNavigate()
  const isAuthenticated = !!localStorage.getItem('token')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' })
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null // Or a loading spinner while redirecting
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto h-screen p-8">
        <Outlet />
      </main>
    </div>
  )
}
