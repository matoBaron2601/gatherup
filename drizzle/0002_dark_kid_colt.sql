ALTER TABLE "dayBlocker" ALTER COLUMN "date" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "earliestPossibleDate" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "latestPossibleDate" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "startDate" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "endDate" SET DATA TYPE text;