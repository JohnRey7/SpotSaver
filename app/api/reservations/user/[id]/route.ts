import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { reservation } from "~/lib/schema";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = params.id;

		if (!id) {
			return NextResponse.json({ message: "Invalid user ID." }, { status: 400 });
		}

		const returnedReservations = await db.query.reservation.findMany({
			where: eq(reservation.userId, id),
		});

		return NextResponse.json({
			message: `Successfully fetched all reservations from user id ${id}`,
			reservations: returnedReservations,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}