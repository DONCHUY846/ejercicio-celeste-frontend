import { useEffect } from 'react'
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../assets/styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import type { Notification } from '@/features/notifications/types'
import { getLocale } from '@/paraglide/runtime'
import { AuthProvider, useAuth } from '@/features/auth/context/auth-context'
import { Toaster } from '@/components/ui/sonner'
import { echo } from '@/lib/echo'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: () => {
    // Other redirect strategies are possible; see
    // https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#offline-redirect
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', getLocale())
    }
  },

  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={getLocale()}>
      <head>
        <HeadContent />
      </head>
      <body>
        <AuthProvider>
          <NotificationListener />
          {children}
        </AuthProvider>
        <Toaster />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function NotificationListener() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const router = useRouter()

  useEffect(() => {
    if (!user?.id) return

    const channel = echo.private(`App.Models.Usuario.${user.id}`)

    channel.notification((notification: Notification) => {
      console.log('Notification received:', notification)

      toast(notification.data.title || 'Nueva notificación', {
        description: notification.data.message,
        action: {
          label: 'Ver',
          onClick: () => router.navigate({ to: notification.data.route_path }),
        },
      })

      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    })

    return () => {
      echo.leave(`App.Models.Usuario.${user.id}`)
    }
  }, [user?.id, queryClient, router])

  return null
}
