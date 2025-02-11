import { AdminAction } from "@/components/adminAction";
import Attendance from "@/components/attendance";
import ErrorPage from "@/components/errorPage";
import EventCalendar from "@/components/eventCalendar";
import { EventDetails } from "@/components/eventDetails";
import { createEventUser } from "@/lib/server/actions/eventUser";
import { getDayBlockersByEventUserId } from "@/lib/server/fetch/dayBlocker";
import { getEventById } from "@/lib/server/fetch/event";
import { getEventUser } from "@/lib/server/fetch/eventUser";
import { validateToken } from "@/lib/server/fetch/token";
import { getAuthenticatedUser } from "@/lib/server/fetch/user";
import { Calendar } from "lucide-react";
import { redirect } from "next/navigation";

export type EventPageProps = {
  params: Promise<{ id: string }>; // Await this before use
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const EventPage = async ({ params, searchParams }: EventPageProps) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const user = await getAuthenticatedUser();
  const userEmail = user?.email ?? "";
  const eventId = resolvedParams.id;
  const event = await getEventById(eventId);
  const eventUser = await getEventUser(eventId, userEmail);

  if (!eventUser) {
    const token = await validateToken(eventId, resolvedSearchParams);
    if (!token)
      return (
        <ErrorPage heading="Invalid Token" icon={<Calendar />} subtitle={""} />
      );
    await createEventUser({ eventId, userEmail });
    redirect(`/event/${eventId}`);
  }

  const dayBlockers = await getDayBlockersByEventUserId(eventUser.id);

  return (
    <div className="flex flex-col gap-8 justify-center">
      <EventDetails
        event={event}
        isCreator={false}
        creator={{
          email: user?.email ?? "",
          name: user?.name ?? "",
          provider: null,
          image: user?.image ?? "",
        }}
      />
      <EventCalendar
        eventId={eventId}
        userEmail={userEmail}
        eventUserId={eventUser.id}
        isCreator={false}
        dayBlockers={dayBlockers}
        range={{
          start: event.earliestPossibleDate,
          end: event.latestPossibleDate,
        }}
      />
      <Attendance event={event} />
    </div>
  );
};

export default EventPage;
