DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('Car', 'Motorcycle', 'Bicycle');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "status" ADD VALUE 'Pending';--> statement-breakpoint
ALTER TYPE "status" ADD VALUE 'Paid';--> statement-breakpoint
ALTER TABLE "vehicle" ADD COLUMN "type" "type" NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicle" DROP COLUMN IF EXISTS "name";