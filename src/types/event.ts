import { events } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Event = InferSelectModel<typeof events>;
export type EventStatus = Event["status"];
export type EventFilters = {
  name?: string; // Partial match on the name
  status?: "opened" | "closed" | "cancelled"; // Filter by status
  dateRange?: {
    // Filter by date ranges
    startDate?: string; // Actual start date of the event
    earliestPossibleDate?: string; // The earliest possible event date
    endDate?: string; // Actual end date of the event
    latestPossibleDate?: string; // The latest possible event date
  };
};
