import { z } from "zod";

const createEventFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    earliestPossibleDate: z.string(),
    latestPossibleDate: z.string(),
  })
  .refine((data) => data.latestPossibleDate > data.earliestPossibleDate, {
    message:
      "The latest possible date must be after the earliest possible date.",
    path: ["latestPossibleDate"],
  })

export default createEventFormSchema;
export type CreateEventFormValues = z.infer<typeof createEventFormSchema>;
