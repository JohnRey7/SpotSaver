import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);

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
		.references(() => users.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});

export type User = typeof users.$inferSelect;
