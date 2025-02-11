import db from "@/db";
import { eventVerificationTokens } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const validateToken = async (
  eventId: string,
  searchParams: { token?: string }
) => {
  const result = await db
    .select()
    .from(eventVerificationTokens)
    .where(
      and(
        eq(eventVerificationTokens.token, searchParams?.token ?? ""),
        eq(eventVerificationTokens.eventId, eventId)
      )
    );
  return result[0];
};
