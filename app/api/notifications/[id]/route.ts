import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { notification } from "~/lib/schema";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = params.id;

		if (!id) {
			return NextResponse.json({ message: "Invalid user ID." }, { status: 400 });
		}

		const returnedNotifications = await db.query.notification.findMany({
			where: eq(notification.userId, id),
		});

		return NextResponse.json({
			message: `Successfully fetched notification from user id ${id}`,
			notifications: returnedNotifications,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}
