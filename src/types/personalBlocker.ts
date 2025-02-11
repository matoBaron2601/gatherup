import { personalBlockers } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type PersonalBlocker = InferSelectModel<typeof personalBlockers>;