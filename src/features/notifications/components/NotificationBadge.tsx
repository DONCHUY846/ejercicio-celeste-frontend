import { Bell } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useUnreadCount } from '../hooks/useNotifications'
import { Button } from '@/components/ui/button'

export function NotificationBadge() {
  const { data } = useUnreadCount()
  const count = data?.count ?? 0

  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link to="/notifications">
        <Bell className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
            {count > 9 ? '9+' : count}
          </span>
        )}
        <span className="sr-only">Notifications</span>
      </Link>
    </Button>
  )
}
