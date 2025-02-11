import db from "@/db";
import { events } from "@/db/schema";
import { EventFilters } from "@/types/event";
import { eq, like, and, gte, lte } from "drizzle-orm";
import { eventFiltersSchema } from "../schemas/event";

export const getEventById = async (eventId: string) => {
  const result = await db.select().from(events).where(eq(events.id, eventId));
  if (result.length === 0) {
    throw new Error("Event not found");
  }
  return result[0];
};

export const getMyEvents = async (
  userEmail: string,
  filters?: EventFilters
) => {
  if(!filters){
    return await db.select().from(events).where(eq(events.creatorEmail, userEmail));
  }
  const parsedFilters = eventFiltersSchema.parse(filters);

  const conditions = [
    eq(events.creatorEmail, userEmail),

    parsedFilters.name
      ? like(events.name, `%${parsedFilters.name}%`)
      : undefined,

    parsedFilters.status ? eq(events.status, parsedFilters.status) : undefined,

    parsedFilters.dateRange?.startDate
      ? gte(events.startDate, parsedFilters.dateRange.startDate)
      : undefined,
    parsedFilters.dateRange?.earliestPossibleDate
      ? gte(
          events.earliestPossibleDate,
          parsedFilters.dateRange.earliestPossibleDate
        )
      : undefined,
    parsedFilters.dateRange?.endDate
      ? lte(events.endDate, parsedFilters.dateRange.endDate)
      : undefined,
    parsedFilters.dateRange?.latestPossibleDate
      ? lte(
          events.latestPossibleDate,
          parsedFilters.dateRange.latestPossibleDate
        )
      : undefined,
  ].filter(Boolean);

  return await db
    .select()
    .from(events)
    .where(and(...conditions));
};
