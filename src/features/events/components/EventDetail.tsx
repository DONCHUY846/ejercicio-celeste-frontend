import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { Calendar, Users } from 'lucide-react'
import { useEvent } from '../hooks/useEvent'
import { useVote } from '../hooks/useVote'
import type { Evento, Pregunta } from '../types'
import { echo } from '@/lib/echo'

const QuestionCard = ({
  pregunta,
  eventId,
}: {
  pregunta: Pregunta
  eventId: number
}) => {
  const { mutate: vote, isPending } = useVote(eventId)

  const handleVote = (respuesta: boolean) => {
    vote({ pregunta_id: pregunta.id, respuesta })
  }

  const stats = pregunta.stats || {
    total: 0,
    yes: 0,
    no: 0,
    yes_percent: 0,
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      <h4 className="text-lg font-medium text-gray-900 mb-4">
        {pregunta.pregunta}
      </h4>

      <div className="space-y-4">
        <div className="flex gap-3">
          <button
            onClick={() => handleVote(true)}
            disabled={isPending}
            className="flex-1 rounded-lg bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 hover:bg-teal-100 transition-colors disabled:opacity-50"
          >
            Sí
          </button>
          <button
            onClick={() => handleVote(false)}
            disabled={isPending}
            className="flex-1 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            No
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Sí ({stats.yes})</span>
            <span>No ({stats.no})</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full bg-teal-500 transition-all duration-500 ease-out"
              style={{ width: `${stats.yes_percent}%` }}
            />
          </div>
          <div className="text-right text-xs text-gray-400">
            Total votos: {stats.total}
          </div>
        </div>
      </div>
    </div>
  )
}

export const EventDetail = ({ eventId }: { eventId: string }) => {
  const { data: event, isLoading, error } = useEvent(eventId)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!eventId) return

    const channel = echo.channel(`surveys.${eventId}`)

    channel.listen('SurveyVoted', (e: any) => {
      queryClient.setQueryData(
        ['events', eventId],
        (oldData: Evento | undefined) => {
          if (!oldData) return oldData

          const updatedPreguntas = oldData.preguntas?.map((p) => {
            if (p.id === e.results.pregunta_id) {
              return {
                ...p,
                stats: e.results.stats,
              }
            }
            return p
          })

          return {
            ...oldData,
            preguntas: updatedPreguntas,
          }
        },
      )
    })

    return () => {
      channel.stopListening('SurveyVoted')
    }
  }, [eventId, queryClient])

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-600">
        Error al cargar el evento
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 text-teal-600 font-medium mb-4">
          <Calendar className="h-5 w-5" />
          {new Date(event.fecha).toLocaleDateString()}
          <span className="text-gray-300">|</span>
          {new Date(event.fecha).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {event.descripcion}
        </h1>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Users className="h-5 w-5" /> Preguntas y Votaciones
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {event.preguntas?.map((pregunta) => (
            <QuestionCard
              key={pregunta.id}
              pregunta={pregunta}
              eventId={event.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
