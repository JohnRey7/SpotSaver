ALTER TABLE "reservation" DROP CONSTRAINT "reservation_vehicle_id_vehicle_id_fk";
--> statement-breakpoint
ALTER TABLE "reservation" ADD COLUMN "vehicle" "type" NOT NULL;--> statement-breakpoint
ALTER TABLE "reservation" DROP COLUMN IF EXISTS "vehicle_id";