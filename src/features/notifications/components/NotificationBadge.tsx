import { useRef } from 'react'
import { Bell } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useUnreadCount } from '../hooks/useNotifications'
import { Button } from '@/components/ui/button'

interface BadgeProps {
  count: number
  // Props injected by TransitionGroup
  in?: boolean
  onExited?: () => void
  [key: string]: any
}

const Badge = ({ count, ...props }: BadgeProps) => {
  const nodeRef = useRef<HTMLSpanElement>(null)

  return (
    <CSSTransition
      nodeRef={nodeRef}
      timeout={300}
      classNames={{
        enter: 'scale-0 opacity-0',
        enterActive:
          'scale-100 opacity-100 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
        exit: 'scale-100 opacity-100',
        exitActive: 'scale-0 opacity-0 transition-all duration-300 ease-in',
      }}
      unmountOnExit
      {...props}
    >
      <span
        ref={nodeRef}
        className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white"
      >
        {count > 9 ? '9+' : count}
      </span>
    </CSSTransition>
  )
}

export function NotificationBadge() {
  const { data } = useUnreadCount()
  const count = data?.count ?? 0

  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link to="/notifications">
        <Bell className="h-5 w-5" />
        <TransitionGroup component={null}>
          {count > 0 && <Badge key={count} count={count} />}
        </TransitionGroup>
        <span className="sr-only">Notifications</span>
      </Link>
    </Button>
  )
}
