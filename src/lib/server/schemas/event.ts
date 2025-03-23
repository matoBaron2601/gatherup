import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  earliestPossibleDate: z.string(),
  latestPossibleDate: z.string(),
});

export const createEventWithUserSchema = createEventSchema.extend({
  userEmail: z.string(),
});

export const setEventStatusSchema = z.object({
  eventId: z.string(),
  status: z.enum(["opened", "confirmed", "cancelled"]),
});

export type SetEventStatusValues = z.infer<typeof setEventStatusSchema>;

export const eventFiltersSchema = z.object({
  name: z.string().optional(),
  status: z.enum(["opened", "confirmed", "cancelled"]).optional(),
  dateRange: z
    .object({
      startDate: z.string().optional(),
      earliestPossibleDate: z.string().optional(),
      endDate: z.string().optional(),
      latestPossibleDate: z.string().optional(),
    })
    .optional(),
});

export const deleteEventSchema = z.object({
  eventId: z.string(),
});

export const copyInviteSchema = z.object({
  eventId: z.string(),
  token: z.string(),
});

export const confirmEventSchema = z.object({
  eventId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const cancelEventSchema = z.object({
  eventId: z.string(),
});

export const reopenEventSchema = z.object({
  eventId: z.string(),
});
