import type { Notification } from '../types'
import { api } from '@/lib/api'

interface NotificationsResponse {
  data: Array<Notification>
  current_page: number
  last_page: number
  total: number
}

export const getNotifications = async (): Promise<NotificationsResponse> => {
  return api('/notifications')
}

export const getUnreadCount = async (): Promise<{ count: number }> => {
  return api('/notifications/unread-count')
}

export const markAsRead = async (id: string) => {
  return api(`/notifications/${id}/read`, {
    method: 'PATCH',
  })
}
