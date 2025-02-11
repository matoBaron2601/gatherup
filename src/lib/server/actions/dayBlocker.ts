'use server'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { actionClient } from "@/lib/safeAction";

import { dayBlockers } from '@/db/schema'
import { replaceDayBlockersSchema } from '../schemas/dayBlocker';
import db from '@/db';


export const replaceDayBlockers = actionClient
  .schema(replaceDayBlockersSchema)
  .action(async ({ parsedInput: data }) => {
    const { eventUserId, data: dayBlockerEntries } = data

    const valuesToInsert = dayBlockerEntries.map((entry) => ({
      eventUserId,
      date: entry.date,
      type: entry.type
    }))

    const res = await db.transaction(async (trx) => {
      await trx.delete(dayBlockers).where(eq(dayBlockers.eventUserId, eventUserId))

      if (valuesToInsert.length > 0) {
        const inserted = await trx.insert(dayBlockers).values(valuesToInsert).returning()
        return inserted
      }

      return []
    })
    revalidatePath(`event/${data.eventId}`)

    return res
  })
