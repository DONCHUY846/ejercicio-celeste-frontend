import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/')({
  // Requiere rol de Administrador (id: 1)
  beforeLoad: ({ context, location }) => {
    if (typeof window === 'undefined') {
      return
    }
    const { isAuthenticated, user } = context.getAuthSnapshot()
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
    // Redirigir a /unauthorized si el rol no es Administrador
    if (!user || user.rol_id !== 1) {
      throw redirect({ to: '/unauthorized' })
    }
  },
  component: AdminPage,
})

function AdminPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Panel de Administración</h1>
      <p className="text-muted-foreground mt-2">
        Solo usuarios con rol Administrador pueden ver esta página.
      </p>
    </div>
  )
}
