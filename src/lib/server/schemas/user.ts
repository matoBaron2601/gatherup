import { z } from 'zod'

export const updateUserSchema = z.object({
  userEmail: z.string()
  
})

export type CreateEventUserValues = z.infer<typeof createEventUserSchema>
