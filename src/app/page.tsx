import db from "@/db";
import { events, eventsUsers } from "@/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { Event } from "@/types/event";
import EventSection from "@/components/eventSection";
import { getAuthenticatedUser } from "@/lib/server/fetch/user";
import { getMyEvents } from "@/lib/server/fetch/event";
const Home = async () => {
  const user = await getAuthenticatedUser();
  const userEmail = user?.email ?? "";

 

  const createdEvents: Event[] = await getMyEvents(userEmail);

  const attendedEvents: Event[] = await db
    .select({
      id: events.id,
      creatorEmail: events.creatorEmail,
      name: events.name,
      description: events.description,
      earliestPossibleDate: events.earliestPossibleDate,
      latestPossibleDate: events.latestPossibleDate,
      startDate: events.startDate,
      endDate: events.endDate,
      status: events.status,
    })
    .from(events)
    .innerJoin(eventsUsers, eq(events.id, eventsUsers.eventId))
    .where(
      and(
        eq(eventsUsers.userEmail, userEmail),
        ne(events.creatorEmail, userEmail)
      )
    );

  return (
    <div className="flex flex-col gap-12">
      <EventSection title="Created Events" events={createdEvents} isCreator />
      <EventSection title="Attended Events" events={createdEvents} />
    </div>
  );
};

export default Home;
