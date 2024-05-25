import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";

export async function GET(request: NextRequest) {
	try {
		const notifications = await db.query.notification.findMany();

		return NextResponse.json(
			{ message: "Successfully fetched all notifications.", notifications },
			{ status: 200 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}
