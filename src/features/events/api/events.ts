import type {
  CreateEventPayload,
  Evento,
  VotePayload,
  VoteResponse,
} from '../types'
import { api } from '@/lib/api'

export const getEvents = async (): Promise<Array<Evento>> => {
  return api('/eventos')
}

export const getEvent = async (id: string): Promise<Evento> => {
  return api(`/eventos/${id}`)
}

export const createEvent = async (
  payload: CreateEventPayload,
): Promise<Evento> => {
  return api('/eventos', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export const voteEvent = async (
  eventId: number,
  payload: VotePayload,
): Promise<VoteResponse> => {
  return api(`/eventos/${eventId}/vote`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
