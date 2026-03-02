import { useState } from 'react'
import {
  BarChart,
  Box,
  Calendar,
  CheckSquare,
  Folder,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Button } from '../components/ui/button'
import { NotificationBadge } from '@/features/notifications/components/NotificationBadge'
import { useAuth } from '@/features/auth/context/auth-context'
import { ChangePasswordModal } from '@/features/auth/components/ChangePasswordModal'

export const Sidebar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  const userName = user?.persona
    ? `${user.persona.nombre} ${user.persona.apellido_p}`
    : 'Usuario'

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-400 rounded-lg flex items-center justify-center text-white shadow-sm">
              <Box size={24} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 leading-none">
                CHUY PIPAS
              </span>
              <span className="text-[10px] font-medium text-gray-500 mt-1 tracking-wide">
                WORKSPACE V1
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <NotificationBadge />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8">
        {/* Main Menu */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
            Main Menu
          </h3>
          <nav className="space-y-1">
            <Link
              to="/"
              activeProps={{ className: 'bg-teal-50 text-teal-600' }}
              inactiveProps={{
                className: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
            <Link
              to="/events"
              activeProps={{ className: 'bg-teal-50 text-teal-600' }}
              inactiveProps={{
                className: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Calendar size={20} />
              Eventos
            </Link>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Folder size={20} />
              Projects
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <CheckSquare size={20} />
              Tasks
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Users size={20} />
              Team
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <BarChart size={20} />
              Analytics
            </button>
          </nav>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
            Support
          </h3>
          <nav className="space-y-1">
            <button
              onClick={() => setIsChangePasswordOpen(true)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Settings size={20} />
              Settings
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <HelpCircle size={20} />
              Help Center
            </button>
          </nav>
        </div>
      </div>

      <ChangePasswordModal
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      />

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between bg-gray-50/50 p-2 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-white shadow-sm">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-teal-100 text-teal-700 font-medium">
                JA
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-gray-900 truncate max-w-[100px]">
                {userName}
              </span>
              <span className="text-[10px] text-gray-500 truncate">
                Admin Plan
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            onClick={handleLogout}
          >
            <LogOut size={16} />
          </Button>
        </div>
      </div>
    </aside>
  )
}
