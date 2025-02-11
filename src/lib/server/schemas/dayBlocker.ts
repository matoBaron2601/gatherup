import { z } from "zod";

export const replaceDayBlockersSchema = z.object({
    eventUserId: z.string(),
    eventId: z.string(),
    data: z.array(
      z.object({
        date: z.string(),
        type: z.enum(['100', '50'])
      })
    )
  })