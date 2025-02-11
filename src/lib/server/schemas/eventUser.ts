import { z } from "zod"

export const createEventUserSchema = z.object({
  eventId: z.string(),
  userEmail: z.string()
})

export type CreateEventUserValues = z.infer<typeof createEventUserSchema>
