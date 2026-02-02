import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  useMarkAsRead,
  useNotifications,
} from '@/features/notifications/hooks/useNotifications'

export const Route = createFileRoute('/_protected/notifications/')({
  component: NotificationsPage,
})

function NotificationsPage() {
  const { data: response, isLoading } = useNotifications()
  const { mutate: markAsRead } = useMarkAsRead()
  const navigate = useNavigate()

  if (isLoading) {
    return <div className="p-4">Cargando notificaciones...</div>
  }

  const notifications = response?.data || []

  const handleNotificationClick = (notification: any) => {
    if (!notification.read_at) {
      markAsRead(notification.id)
    }
    if (notification.data.route_path) {
      navigate({ to: notification.data.route_path })
    }
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString))
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Notificaciones</h1>
      <div className="grid gap-4">
        {notifications.length === 0 ? (
          <p className="text-muted-foreground">No tienes notificaciones.</p>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`cursor-pointer transition-colors hover:bg-accent/50 ${!notification.read_at ? 'border-l-4 border-l-primary' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between text-base font-medium">
                  {notification.data.title}
                  <span className="text-xs font-normal text-muted-foreground">
                    {formatDate(notification.created_at)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{notification.data.message}</CardDescription>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
