import { useMutation, useQueryClient } from '@tanstack/react-query'
import { voteEvent } from '../api/events'
import type { VotePayload } from '../types'

export const useVote = (eventId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: VotePayload) => voteEvent(eventId, payload),
    onSuccess: (data) => {
      // Optimistic update or invalidate is possible here,
      // but we rely on real-time updates mostly.
      // However, for immediate feedback:
      queryClient.invalidateQueries({ queryKey: ['events', String(eventId)] })
    },
  })
}
