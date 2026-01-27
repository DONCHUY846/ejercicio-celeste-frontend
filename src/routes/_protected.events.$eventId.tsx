import { createFileRoute } from '@tanstack/react-router'
import { EventDetail } from '@/features/events/components/EventDetail'

export const Route = createFileRoute('/_protected/events/$eventId')({
  component: EventDetailPage,
})

function EventDetailPage() {
  const { eventId } = Route.useParams()
  return (
    <div className="p-4">
      <EventDetail eventId={eventId} />
    </div>
  )
}
