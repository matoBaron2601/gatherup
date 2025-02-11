CREATE TYPE "public"."dayBlockersType" AS ENUM('100', '50', 'dateBlocker');--> statement-breakpoint
CREATE TYPE "public"."eventStatus" AS ENUM('opened', 'confirmed', 'cancelled');--> statement-breakpoint
CREATE TABLE "dayBlocker" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"eventsUsersId" uuid NOT NULL,
	"date" timestamp NOT NULL,
	"type" "dayBlockersType" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eventVerificationToken" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token" text NOT NULL,
	"eventId" uuid NOT NULL,
	"expires" timestamp
);
--> statement-breakpoint
CREATE TABLE "event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"creatorEmail" text NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"duration" integer NOT NULL,
	"earliestPossibleDate" timestamp NOT NULL,
	"latestPossibleDate" timestamp NOT NULL,
	"startDate" timestamp,
	"endDate" timestamp,
	"status" "eventStatus" DEFAULT 'opened' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eventUser" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"eventId" uuid NOT NULL,
	"creatorEmail" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"email" text PRIMARY KEY NOT NULL,
	"name" text,
	"image" text,
	"provider" text
);
--> statement-breakpoint
ALTER TABLE "dayBlocker" ADD CONSTRAINT "dayBlocker_eventsUsersId_eventUser_id_fk" FOREIGN KEY ("eventsUsersId") REFERENCES "public"."eventUser"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventVerificationToken" ADD CONSTRAINT "eventVerificationToken_eventId_event_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_creatorEmail_users_email_fk" FOREIGN KEY ("creatorEmail") REFERENCES "public"."users"("email") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventUser" ADD CONSTRAINT "eventUser_eventId_event_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventUser" ADD CONSTRAINT "eventUser_creatorEmail_users_email_fk" FOREIGN KEY ("creatorEmail") REFERENCES "public"."users"("email") ON DELETE cascade ON UPDATE no action;