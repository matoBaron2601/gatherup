import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  earliestPossibleDate: z.string(),
  latestPossibleDate: z.string(),
});

export const createEventWithUserSchema = createEventSchema.extend({userEmail: z.string()});

