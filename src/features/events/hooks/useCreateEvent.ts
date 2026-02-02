import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEvent } from '../api/events'
import type { CreateEventPayload } from '../types'

export const useCreateEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateEventPayload) => createEvent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
