DO $$ BEGIN
 CREATE TYPE "public"."notif_type" AS ENUM('REGISTER', 'RESERVE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "notification" ADD COLUMN "notif_type" "notif_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "notification" DROP COLUMN IF EXISTS "type";