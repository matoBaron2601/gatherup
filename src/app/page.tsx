import { getAuthenticatedUser } from "@/lib/server/fetch/user";
import { getAttendedEvents, getMyEvents } from "@/lib/server/fetch/event";
import { Event } from "@/types/event";
import EventSection from "@/components/eventSection";
import FilterButtons from "@/components/filterButtons";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const user = await getAuthenticatedUser('');
  const userEmail = user?.email ?? "";
  const resolvedSearchParams = await searchParams;

  const filter = resolvedSearchParams.filter || "All";

  const fetchMyEvents = async (filter: string) => {
    let eventFilter = {};
    if (filter === "Opened") {
      eventFilter = { status: "opened" };
    } else if (filter === "Confirmed") {
      eventFilter = { status: "confirmed" };
    } else if (filter === "Cancelled") {
      eventFilter = { status: "cancelled" };
    }

    return await getMyEvents(userEmail, eventFilter);
  };

  const fetchAttendedEvents = async (filter: string) => {
    let eventFilter = {};
    if (filter === "Opened") {
      eventFilter = { status: "opened" };
    } else if (filter === "Confirmed") {
      eventFilter = { status: "confirmed" };
    } else if (filter === "Cancelled") {
      eventFilter = { status: "cancelled" };
    }
    console.info(eventFilter)
    return await getAttendedEvents(userEmail);
  };

  const createdEvents: Event[] = await fetchMyEvents(filter);
  const attendedEvents: Event[] = await fetchAttendedEvents(filter);
  const notCreatedButAttendedEvents = attendedEvents.filter(
    (attendedEvent) =>
      !createdEvents.some(
        (createdEvent) => createdEvent.id === attendedEvent.id
      )
  );

  return (
    <div className="flex flex-col gap-4 px-8 pt-4">
      <FilterButtons currentFilter={resolvedSearchParams.filter} />
      <EventSection title="Created Events" events={createdEvents} isCreator />
      <EventSection title="Attended Events" events={notCreatedButAttendedEvents} />
    </div>
  );
};

export default Home;
