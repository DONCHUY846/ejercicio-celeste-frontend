import { createFileRoute } from '@tanstack/react-router'
import { EventList } from '@/features/events/components/EventList'

export const Route = createFileRoute('/_protected/events/')({
  component: EventsPage,
})

function EventsPage() {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Eventos del Condominio
        </h1>
        <p className="text-sm text-gray-500">
          Participa en las votaciones activas.
        </p>
      </div>
      <EventList />
    </div>
  )
}
