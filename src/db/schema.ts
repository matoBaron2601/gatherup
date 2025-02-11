import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  email: text("email").primaryKey(),
  name: text("name"),
  image: text("image"),
  provider: text("provider"),
});

export const eventStatusEnum = pgEnum("eventStatus", [
  "opened",
  "confirmed",
  "cancelled",
]);

export const events = pgTable("event", {
  id: uuid("id").primaryKey().defaultRandom(),
  creatorEmail: text("creatorEmail")
    .notNull()
    .references(() => users.email, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  earliestPossibleDate: text("earliestPossibleDate").notNull(),
  latestPossibleDate: text("latestPossibleDate").notNull(),
  startDate: text("startDate"),
  endDate: text("endDate"),
  status: eventStatusEnum("status").notNull().default("opened"),
});

export const eventsUsers = pgTable("eventUser", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: uuid("eventId")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  userEmail: text("userEmail")
    .notNull()
    .references(() => users.email, { onDelete: "cascade" }),
});

export const dayBlockersTypeEnum = pgEnum("dayBlockersType", [
  "100",
  "50",
]);

export const dayBlockers = pgTable("dayBlocker", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventUserId: uuid("eventUserId")
    .notNull()
    .references(() => eventsUsers.id, { onDelete: "cascade" }),
  date: text("date").notNull(),
  type: dayBlockersTypeEnum("type").notNull(),
});

export const eventVerificationTokens = pgTable("eventVerificationToken", {
  id: uuid("id").primaryKey().defaultRandom(),
  token: text("token").notNull(),
  eventId: uuid("eventId")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }),
});


export const personalBlockers = pgTable("personalBlocker", {
  id: uuid("id").primaryKey().defaultRandom(),
  userEmail: text("userEmail")
    .notNull()
    .references(() => users.email, { onDelete: "cascade" }),
  from: text("from").notNull(),
  to: text("to").notNull(),
  reason: text("reason").notNull(),
});
