"use server";
import { revalidatePath } from "next/cache";

import { events } from "@/db/schema";
import db from "@/db";
import { createEventWithUserSchema, deleteEventSchema, setEventStatusSchema } from "../schemas/event";
import { actionClient } from "@/lib/safeAction";
import { eq } from "drizzle-orm";

export const createEvent = actionClient
  .schema(createEventWithUserSchema)
  .action(async ({ parsedInput: data }) => {

    const res = await db
      .insert(events)
      .values({
        creatorEmail: data.userEmail,
        name: data.name,
        description: data.description,
        earliestPossibleDate: data.earliestPossibleDate,
        latestPossibleDate: data.latestPossibleDate,
      })
      .returning();

    if (res.length === 0) {
      throw new Error("Failed to create event");
    }
    revalidatePath("/");
    return res;
  });

export const setEventStatus = actionClient.schema(setEventStatusSchema).action(async ({ parsedInput: data }) => {
    const res = await db
        .update(events)
        .set({ status: data.status })
        .where(eq( events.id, data.eventId))
        .returning();
    
    if (res.length === 0) {
        throw new Error("Failed to update event status");
    }
    revalidatePath("/");
    revalidatePath(`event/${data.eventId}`)
    return res;
});

export const deleteEvent = actionClient.schema(deleteEventSchema).action(async ({ parsedInput : data }) => {
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