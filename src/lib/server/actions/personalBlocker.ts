"use server";

import { revalidatePath } from "next/cache";
import { personalBlockers } from "@/db/schema";
import { actionClient } from "@/lib/safeAction";
import db from "@/db";
import { createPersonalBlockerFormWithUserSchema } from "../schemas/personalBlocker";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const createPersonalBlocker = actionClient
  .schema(createPersonalBlockerFormWithUserSchema)
  .action(async ({ parsedInput: data }) => {
    const res = await db
      .insert(personalBlockers)
      .values({
        userEmail: data.userEmail,
        from: data.from,
        to: data.to,
        reason: data.reason,
      })
      .returning();

    if (res.length === 0) throw new Error("Failed to create personal blocker");
    revalidatePath("/");
    return res[0];
  });

export const deletePersonalBlocker = actionClient
  .schema(z.string())
  .action(async ({ parsedInput: id }) => {
    const res = await db
      .delete(personalBlockers)
      .where(eq(personalBlockers.id, id))
      .returning();
    if (res.length === 0) throw new Error("Failed to delete personal blocker");
    revalidatePath("/");
    return res[0];
  });
