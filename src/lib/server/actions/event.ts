"use server";
import { revalidatePath } from "next/cache";

import { events, eventsUsers, eventVerificationTokens } from "@/db/schema";
import db from "@/db";
import {
  confirmEventSchema,
  copyInviteSchema,
  createEventWithUserSchema,
  deleteEventSchema,
  reopenEventSchema,
} from "../schemas/event";
import { actionClient } from "@/lib/safeAction";
import { eq } from "drizzle-orm";

export const createEventWithUser = actionClient
  .schema(createEventWithUserSchema)
  .action(async ({ parsedInput: data }) => {
    const res = await db.transaction(async (trx) => {
      const eventRes = await trx
        .insert(events)
        .values({
          creatorEmail: data.userEmail,
          name: data.name,
          description: data.description,
          earliestPossibleDate: data.earliestPossibleDate,
          latestPossibleDate: data.latestPossibleDate,
        })
        .returning();

      if (eventRes.length === 0) {
        throw new Error("Failed to create event");
      }

      const event = eventRes[0];

      const userRes = await trx
        .insert(eventsUsers)
        .values({
          userEmail: data.userEmail,
          eventId: event.id,
        })
        .returning();

      if (userRes.length === 0) {
        throw new Error("Failed to create event user");
      }

      return { event, user: userRes[0] };
    });

    revalidatePath("/");
    return res;
  });

export const deleteEvent = actionClient
  .schema(deleteEventSchema)
  .action(async ({ parsedInput: data }) => {
    const res = await db
      .delete(events)
      .where(eq(events.id, data.eventId))
      .returning();

    if (res.length === 0) {
      throw new Error("Failed to delete event");
    }
    revalidatePath("/");
    return res;
  });

export const copyInvite = actionClient
  .schema(copyInviteSchema)
  .action(async ({ parsedInput: data }) => {
    const res = await db
      .insert(eventVerificationTokens)
      .values({ token: data.token, eventId: data.eventId })
      .returning();
    if (res.length === 0) {
      throw new Error("Failed to copy invite");
    }
    revalidatePath("/");
    return res;
  });

export const confirmEvent = actionClient
  .schema(confirmEventSchema)
  .action(async ({ parsedInput: data }) => {
    const res = await db
      .update(events)
      .set({
        startDate: data.startDate,
        endDate: data.endDate,
        status: "confirmed",
      })
      .where(eq(events.id, data.eventId))
      .returning();

    if (res.length === 0) {
      throw new Error("Failed to confirm event");
    }
    revalidatePath("/");
    revalidatePath(`event/${data.eventId}`);
    return res;
  });

export const cancelEvent = actionClient
  .schema(deleteEventSchema)
  .action(async ({ parsedInput: data }) => {
    const res = await db
      .update(events)
      .set({ status: "cancelled", startDate: null, endDate: null })
      .where(eq(events.id, data.eventId))
      .returning();

    if (res.length === 0) {
      throw new Error("Failed to cancel event");
    }
    revalidatePath("/");
    revalidatePath(`event/${data.eventId}`);
    return res;
  });

  export const reopenEvent = actionClient
  .schema(reopenEventSchema)
  .action(async ({ parsedInput: data }) => {
    const res = await db
      .update(events)
      .set({ status: "opened" })
      .where(eq(events.id, data.eventId))
      .returning();

    if (res.length === 0) {
      throw new Error("Failed to reopen event");
    }
    revalidatePath("/");
    revalidatePath(`event/${data.eventId}`);
    return res;
  })