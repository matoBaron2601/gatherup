import { z } from "zod"

export const createPersonalBlockerFormSchema = z.object({
    from: z.string(),
    to: z.string(),
    reason: z.string()
})

export const createPersonalBlockerFormWithUserSchema = createPersonalBlockerFormSchema.extend({userEmail: z.string()})

export type CreatePersonalBlockerFormValues = z.infer<typeof createPersonalBlockerFormSchema>
