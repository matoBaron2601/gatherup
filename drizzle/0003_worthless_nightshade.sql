ALTER TABLE "public"."dayBlocker" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."dayBlockersType";--> statement-breakpoint
CREATE TYPE "public"."dayBlockersType" AS ENUM('100', '50');--> statement-breakpoint
ALTER TABLE "public"."dayBlocker" ALTER COLUMN "type" SET DATA TYPE "public"."dayBlockersType" USING "type"::"public"."dayBlockersType";