import { useEffect, useRef, useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { X } from 'lucide-react'

import type { Notification } from '@/features/notifications/types'
import { useAuth } from '@/features/auth/context/auth-context'
import { echo } from '@/lib/echo'
import { cn } from '@/lib/utils'

interface NotificationToastProps {
  notification: Notification
  onDismiss: (id: string) => void
  // Props injected by TransitionGroup
  in?: boolean
  onExited?: () => void
}

const NotificationToast = ({
  notification,
  onDismiss,
  ...props
}: NotificationToastProps) => {
  const nodeRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  return (
    <CSSTransition
      nodeRef={nodeRef}
      timeout={300}
      classNames={{
        enter: 'translate-x-full opacity-0',
        enterActive:
          'translate-x-0 opacity-100 transition-all duration-300 ease-out',
        exit: 'translate-x-0 opacity-100',
        exitActive:
          'translate-x-full opacity-0 transition-all duration-300 ease-in',
      }}
      unmountOnExit
      {...props}
    >
      <div
        ref={nodeRef}
        className={cn(
          'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5',
          'dark:bg-zinc-900 dark:ring-white/10',
          'mb-3 flex items-start p-4',
        )}
        role="alert"
      >
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {notification.title || 'Nueva notificación'}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {notification.message}
          </p>
          {notification.route_path && (
            <button
              onClick={() => {
                router.navigate({
                  to: notification.route_path,
                })
                onDismiss(notification.id)
              }}
              className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Ver detalles
            </button>
          )}
        </div>
        <div className="ml-4 flex flex-shrink-0">
          <button
            type="button"
            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-zinc-900 dark:text-gray-500 dark:hover:text-gray-400"
            onClick={() => onDismiss(notification.id)}
          >
            <span className="sr-only">Cerrar</span>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </CSSTransition>
  )
}

export function NotificationListener() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [notifications, setNotifications] = useState<Array<Notification>>([])

  // Auto-dismiss logic
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notifications])

  useEffect(() => {
    if (!user?.id) return

    const channel = echo.private(`App.Models.Usuario.${user.id}`)

    channel.notification((notification: Notification) => {
      // Add unique notification
      setNotifications((prev) => {
        if (prev.find((n) => n.id === notification.id)) return prev
        return [...prev, notification]
      })

      // Invalidate both general notifications and unread count explicitly
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({
        queryKey: ['notifications', 'unread-count'],
      })
    })

    return () => {
      echo.leave(`App.Models.Usuario.${user.id}`)
    }
  }, [user?.id, queryClient])

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  // Render container
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex flex-col items-end px-4 py-6 sm:items-end sm:p-6 z-50"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <TransitionGroup component={null}>
          {notifications.map((notification) => (
            <NotificationToast
              key={notification.id}
              notification={notification}
              onDismiss={removeNotification}
            />
          ))}
        </TransitionGroup>
      </div>
    </div>
  )
}
