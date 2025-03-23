CREATE TYPE "public"."dayBlockersType" AS ENUM('100', '50');--> statement-breakpoint
CREATE TYPE "public"."eventStatus" AS ENUM('opened', 'confirmed', 'cancelled');--> statement-breakpoint
CREATE TABLE "dayBlocker" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"eventUserId" uuid NOT NULL,
	"date" text NOT NULL,
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
	"earliestPossibleDate" text NOT NULL,
	"latestPossibleDate" text NOT NULL,
	"startDate" text,
	"endDate" text,
	"status" "eventStatus" DEFAULT 'opened' NOT NULL,
	"minDuration" text,
	"maxDuration" text
);
--> statement-breakpoint
CREATE TABLE "eventUser" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"eventId" uuid NOT NULL,
	"userEmail" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "personalBlocker" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userEmail" text NOT NULL,
	"from" text NOT NULL,
	"to" text NOT NULL,
	"reason" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"email" text PRIMARY KEY NOT NULL,
	"name" text,
	"image" text,
	"provider" text
);
--> statement-breakpoint
ALTER TABLE "dayBlocker" ADD CONSTRAINT "dayBlocker_eventUserId_eventUser_id_fk" FOREIGN KEY ("eventUserId") REFERENCES "public"."eventUser"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventVerificationToken" ADD CONSTRAINT "eventVerificationToken_eventId_event_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_creatorEmail_users_email_fk" FOREIGN KEY ("creatorEmail") REFERENCES "public"."users"("email") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventUser" ADD CONSTRAINT "eventUser_eventId_event_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventUser" ADD CONSTRAINT "eventUser_userEmail_users_email_fk" FOREIGN KEY ("userEmail") REFERENCES "public"."users"("email") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personalBlocker" ADD CONSTRAINT "personalBlocker_userEmail_users_email_fk" FOREIGN KEY ("userEmail") REFERENCES "public"."users"("email") ON DELETE cascade ON UPDATE no action;