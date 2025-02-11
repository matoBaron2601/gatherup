import db from "@/db";
import { personalBlockers } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getPersonalBlockersByUserEmail = async (userEmail: string) => {
  return await db.select().from(personalBlockers).where(eq(personalBlockers.userEmail, userEmail));
};
