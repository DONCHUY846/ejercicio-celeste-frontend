import { useQuery } from '@tanstack/react-query'
import { getEvent } from '../api/events'

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => getEvent(id),
    enabled: !!id,
  })
}
