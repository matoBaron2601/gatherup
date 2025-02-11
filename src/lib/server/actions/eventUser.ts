"use server";

import { revalidatePath } from "next/cache";
import { eventsUsers } from "@/db/schema";
import { actionClient } from "@/lib/safeAction";
import db from "@/db";
import { createEventUserSchema } from "../schemas/eventUser";

export const createEventUser = actionClient
  .schema(createEventUserSchema)
  .action(async ({ parsedInput: data }) => {
    const res = await db
      .insert(eventsUsers)
      .values({
        userEmail: data.userEmail,
        eventId: data.eventId,
      })
      .returning();

    if (res.length === 0) throw new Error("Failed to create event user");
    revalidatePath('/')
    return res[0];
  });
