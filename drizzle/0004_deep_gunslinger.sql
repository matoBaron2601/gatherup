ALTER TABLE "dayBlocker" RENAME COLUMN "eventsUsersId" TO "eventUserId";--> statement-breakpoint
ALTER TABLE "dayBlocker" DROP CONSTRAINT "dayBlocker_eventsUsersId_eventUser_id_fk";
--> statement-breakpoint
ALTER TABLE "dayBlocker" ADD CONSTRAINT "dayBlocker_eventUserId_eventUser_id_fk" FOREIGN KEY ("eventUserId") REFERENCES "public"."eventUser"("id") ON DELETE cascade ON UPDATE no action;