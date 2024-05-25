import { relations } from "drizzle-orm";
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
	time,
	timestamp,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);
export const paymentStatusEnum = pgEnum("status", ["Pending", "Paid"]);
export const vehicleType = pgEnum("type", ["Car", "Motorcycle", "Bicycle"]);
export const notifType = pgEnum("notif_type", ["REGISTER", "RESERVE"]);

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

export const reservation = pgTable("reservation", {
	id: serial("id").primaryKey(),
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	parkingId: integer("parking_id")
		.references(() => parkingSpot.id, { onDelete: "cascade" })
		.notNull(),
	vehicle: vehicleType("vehicle").notNull(),
	date: timestamp("date", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
	startTime: time("start_time", { withTimezone: true }).notNull(),
});

export const payment = pgTable("payment", {
	id: serial("id").primaryKey(),
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	reservationId: integer("reservation_id")
		.references(() => reservation.id, { onDelete: "cascade" })
		.notNull(),
	amount: integer("amount").notNull(),
	methodOfPayment: text("payment_method").notNull(),
	paymentDate: timestamp("payment_date", { withTimezone: true }).defaultNow().notNull(),
	status: paymentStatusEnum("status").notNull(),
});

export const paymentRelations = relations(payment, ({ one }) => ({
	reservation: one(reservation, {
		fields: [payment.reservationId],
		references: [reservation.id],
	}),
}));

export const qrCode = pgTable("qr_code", {
	id: serial("id").primaryKey(),
	reservationId: integer("reservation_id")
		.references(() => reservation.id, { onDelete: "cascade" })
		.notNull(),
	code: text("code").notNull(),
});

export const notification = pgTable("notification", {
	id: serial("id").primaryKey(),
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	type: notifType("notif_type").notNull(),
	timestamp: timestamp("timestamp", { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferInsert;
export type ParkingSpot = typeof parkingSpot.$inferInsert;
export type Reservation = typeof reservation.$inferInsert;
export type Payment = typeof payment.$inferInsert;
export type QrCode = typeof qrCode.$inferInsert;
export type Notification = typeof notification.$inferInsert;

export type UserSelect = typeof users.$inferSelect;
export type ParkingSpotSelect = typeof parkingSpot.$inferSelect;
export type ReservationSelect = typeof reservation.$inferSelect;
export type PaymentSelect = typeof payment.$inferSelect;
export type QrCodeSelect = typeof qrCode.$inferSelect;
export type NotificationSelect = typeof notification.$inferSelect;

export type VehicleType = Reservation["vehicle"];
export type Role = User["role"];
export type PaymentStatus = Payment["status"];
export type NotifType = Notification["type"];
