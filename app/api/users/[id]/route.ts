import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { User, users } from "~/lib/schema";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = params.id;

		if (!id) {
			return NextResponse.json({ message: "Invalid ID." }, { status: 400 });
		}

		const returnedUser = await db.query.users.findFirst({ where: eq(users.id, id) });
		if (!returnedUser) {
			return NextResponse.json({ message: "User not found." }, { status: 404 });
		}

		return NextResponse.json({
			message: `Successfully fetched user ${id}`,
			user: returnedUser,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = params.id;

		if (!id) {
			return NextResponse.json({ message: "Invalid ID." }, { status: 400 });
		}

		const body = (await request.json()) as Partial<User>;

		const returnedUser = await db.update(users).set(body).where(eq(users.id, id)).returning();

		return NextResponse.json({
			message: `Successfully updated user id ${id}`,
			user: returnedUser[0],
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = params.id;

		if (!id) {
			return NextResponse.json({ message: "Invalid ID." }, { status: 400 });
		}

		const returnedUser = await db.delete(users).where(eq(users.id, id)).returning();

		return NextResponse.json({
			message: `Successfully deleted user id ${id}`,
			user: returnedUser[0],
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}
