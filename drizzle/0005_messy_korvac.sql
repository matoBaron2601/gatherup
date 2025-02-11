ALTER TABLE "eventUser" RENAME COLUMN "creatorEmail" TO "userEmail";--> statement-breakpoint
ALTER TABLE "eventUser" DROP CONSTRAINT "eventUser_creatorEmail_users_email_fk";
--> statement-breakpoint
ALTER TABLE "eventUser" ADD CONSTRAINT "eventUser_userEmail_users_email_fk" FOREIGN KEY ("userEmail") REFERENCES "public"."users"("email") ON DELETE cascade ON UPDATE no action;