import { z } from 'zod'

export const updateUserSchema = z.object({
  userEmail: z.string()
  
})
