import EventCard from '@/components/eventCard'
import { type Event } from '@/types/event'
export type EventSectionProps = {
  title: string
  events: Event[]
  isCreator?: boolean
}
const EventSection = ({ title, events, isCreator = false }: EventSectionProps) => {
  if (!events || events.length === 0) return null

  return (
    <section>
      <p>{title}</p>
      <div className='flex gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {events.map((event) => (
          <EventCard key={event.id} {...event} event={event} isCreator={isCreator} />
        ))}
      </div>
    </section>
  )
}

export default EventSection
