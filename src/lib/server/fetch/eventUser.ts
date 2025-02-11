import db from "@/db";
import { eventsUsers, users } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";

export const getEventUser = async (eventId: string, userEmail: string) => {
  const result = await db
    .select()
    .from(eventsUsers)
    .where(
      and(
        eq(eventsUsers.eventId, eventId),
        eq(eventsUsers.userEmail, userEmail)
      )
    );
  return result[0];
};

export const getUsersByEventId = async (eventId: string) => {
  return await db.transaction(async (trx) => {
    const eventUsers = await trx
      .select()
      .from(eventsUsers)
      .where(eq(eventsUsers.eventId, eventId));

    const userEmails = eventUsers.map((eventUser) => eventUser.userEmail);

    const usersList = await trx
      .select()
      .from(users)
      .where(sql`${users.email} IN (${sql.join(userEmails)})`);

    return usersList;
  });
};

export const getEventUsersByEventId = async (eventId: string) => {
  return await db.select().from(eventsUsers).where(eq(eventsUsers.eventId, eventId));
}
