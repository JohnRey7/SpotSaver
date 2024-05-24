import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia, type Session, type User } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { Google } from "arctic";

import { db } from "./db";
import { sessions, users, type UserSelect as DatabaseUser } from "./schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: (attr) => ({
		id: attr.id,
		firstName: attr.firstName,
		middleName: attr.middleName,
		lastName: attr.lastName,
		email: attr.email,
		role: attr.role,
	}),
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUser;
	}
}

// OAuth2 Provider
export const google = new Google(
	process.env.GOOGLE_CLIENT_ID!,
	process.env.GOOGLE_CLIENT_SECRET!,
	process.env.GOOGLE_REDIRECT_URI!
);

export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null,
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}
		return result;
	}
);

/**
 * Redirects the user based on their authentication status
 *
 * @param { boolean } authenticated - If the user is authenticated
 * @param { string } redirectTo - The path to redirect to
 */
export async function redirectIfAuth(authenticated: boolean, redirectTo: string) {
	const { user } = await validateRequest();
	if (authenticated === !!user) {
		return redirect(redirectTo);
	}
}
