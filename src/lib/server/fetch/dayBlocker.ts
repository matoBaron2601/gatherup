import db from "@/db";
import { dayBlockers } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getDayBlockersByEventUserId = async (eventUserId: string) => {
  return await db.select().from(dayBlockers).where(eq(dayBlockers.eventUserId, eventUserId));
};
