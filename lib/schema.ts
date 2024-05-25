import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);
export const paymentStatusEnum = pgEnum("status", ["Pending", "Paid"]);
export const vehicleType = pgEnum("type", ["Car", "Motorcycle", "Bicycle"]);

export const users = pgTable("users", {
	id: text("id").primaryKey(),
	googleId: text("google_id").notNull(),
	firstName: text("first_name"),
	middleName: text("middle_name"),
	lastName: text("last_name"),
	email: text("email").unique().notNull(),
	role: roleEnum("role"),
});

export const sessions = pgTable("sessions", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});

export const parkingSpot = pgTable("parking_spot", {
	id: serial("id").primaryKey(),
	location: text("location").notNull(),
	availability: boolean("availability").notNull(),
});

export const vehicle = pgTable("vehicle", {
	id: serial("id").primaryKey(),
	type: vehicleType("type").notNull(),
});

export const reservation = pgTable("reservation", {
	id: serial("id").primaryKey(),
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	parkingId: integer("parking_id")
		.references(() => parkingSpot.id, { onDelete: "cascade" })
		.notNull(),
	vehicleId: integer("vehicle_id")
		.references(() => vehicle.id, { onDelete: "cascade" })
		.notNull(),
	date: timestamp("date", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
	startTime: timestamp("start_time", { withTimezone: true }).notNull(),
});

export const payment = pgTable("payment", {
	id: serial("id").primaryKey(),
	reservationId: integer("reservation_id")
		.references(() => reservation.id, { onDelete: "cascade" })
		.notNull(),
	amount: integer("amount").notNull(),
	methodOfPayment: text("payment_method").notNull(),
	paymentDate: timestamp("payment_date", { withTimezone: true }).defaultNow().notNull(),
	status: paymentStatusEnum("status").notNull(),
});

export const qrCode = pgTable("qr_code", {
	id: serial("id").primaryKey(),
	reservationId: integer("reservation_id")
		.references(() => reservation.id, { onDelete: "cascade" })
		.notNull(),
	code: text("code").notNull(),
});

export type User = typeof users.$inferInsert;
export type ParkingSpot = typeof parkingSpot.$inferInsert;
export type Vehicle = typeof vehicle.$inferInsert;
export type Reservation = typeof reservation.$inferInsert;
export type Payment = typeof payment.$inferInsert;
export type QrCode = typeof qrCode.$inferInsert;

export type UserSelect = typeof users.$inferSelect;
export type ParkingSpotSelect = typeof parkingSpot.$inferSelect;
export type VehicleSelect = typeof vehicle.$inferSelect;
export type ReservationSelect = typeof reservation.$inferSelect;
export type PaymentSelect = typeof payment.$inferSelect;
export type QrCodeSelect = typeof qrCode.$inferSelect;
