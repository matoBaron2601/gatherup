"use server";
import { revalidatePath } from "next/cache";

import { events } from "@/db/schema";
import db from "@/db";
import { actionClient } from "../safeActions";
import { createEventWithUserSchema } from "../schemas/event";
import { checkIsAuthUser } from "../utilts";

export const createEvent = actionClient
  .schema(createEventWithUserSchema)
  .action(async ({ parsedInput: data }) => {
    await checkIsAuthUser(data.userEmail);

    const res = await db
      .insert(events)
      .values({
        creatorEmail: data.userEmail,
        name: data.name,
        description: data.description ?? "",
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
