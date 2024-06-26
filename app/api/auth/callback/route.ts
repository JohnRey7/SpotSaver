import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { cookies } from "next/headers";

import { google, lucia, redirectIfAuth } from "~/lib/auth";
import { db } from "~/lib/db";
import { notification, users } from "~/lib/schema";

interface GoogleUser {
	sub: string;
	name: string;
	given_name: string;
	family_name: string;
	email: string;
	picture: string;
	email_verified: boolean;
	locale: string;
}

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	const storedState = cookies().get("google_oauth_state")?.value ?? null;
	const storedCodeVerifier = cookies().get("google_code_verifier")?.value ?? null;

	if (!code || !state || !storedState || !storedCodeVerifier || state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	await redirectIfAuth(true, "/dashboard");

	try {
		const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
		const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		});
		const googleUser: GoogleUser = await response.json();

		const existingUser = await db.query.users.findFirst({
			where: eq(users.googleId, googleUser.sub),
		});

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/",
				},
			});
		}

		const userId = generateId(14);

		await db.transaction(async (tx) => {
			await tx.insert(users).values({
				id: userId,
				googleId: googleUser.sub,
				email: googleUser.email,
				firstName: googleUser.given_name,
				lastName: googleUser.family_name,
				role: "USER",
			});
			await tx.insert(notification).values({
				type: "REGISTER",
				userId,
			});
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/",
			},
		});
	} catch (e) {
		console.log(e);
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400,
			});
		}
		return new Response(null, {
			status: 500,
		});
	}
}
