import { dayBlockers } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type DayBlocker = InferSelectModel<typeof dayBlockers>;
export type DayBlockerType = DayBlocker["type"];
export type CalendarDayBlocker = Omit<DayBlocker, "id" | 'eventUserId'>;