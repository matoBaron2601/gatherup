import { getAuthenticatedUser } from "@/lib/server/fetch/user";
import { getMyEvents } from "@/lib/server/fetch/event";
import { Event } from "@/types/event";
import EventSection from "@/components/eventSection";
import FilterButtons from "@/components/filterButtons";

const Home = async ({
  searchParams,
}: {
  searchParams: { filter?: string };
}) => {
  const user = await getAuthenticatedUser();
  const userEmail = user?.email ?? "";

  const filter = searchParams.filter || "All";

  const fetchEvents = async (filter: string) => {
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

  const createdEvents: Event[] = await fetchEvents(filter);

  return (
    <div className="flex flex-col gap-4 px-8 pt-4">
      <FilterButtons currentFilter={searchParams.filter} />
      <div className="w-full h-1 bg-color4 rounded-lg"/>
      <EventSection title="Created Events" events={createdEvents} isCreator />
    </div>
  );
};

export default Home;
