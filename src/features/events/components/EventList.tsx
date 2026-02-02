import { Link } from '@tanstack/react-router'
import { Calendar, ChevronRight } from 'lucide-react'
import { useEvents } from '../hooks/useEvents'
import { CreateEventModal } from './CreateEventModal'

export const EventList = () => {
  const { data: events, isLoading, error } = useEvents()

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-600">
        Error al cargar eventos
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Próximos Eventos</h2>
        <CreateEventModal />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events?.map((event) => (
          <Link
            key={event.id}
            to="/events/$eventId"
            params={{ eventId: event.id.toString() }}
            className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-teal-600 font-medium mb-3">
                <Calendar className="h-4 w-4" />
                {new Date(event.fecha).toLocaleDateString()}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors mb-2">
                {event.descripcion}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-4">
                Ver detalles <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
