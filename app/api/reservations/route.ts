import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { Reservation, parkingSpot, reservation } from "~/lib/schema";

export async function GET(request: NextRequest) {
	try {
		const reservations = await db.query.reservation.findMany();

		return NextResponse.json(
			{ message: "Successfully fetched all reservations.", reservations },
			{ status: 200 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as Reservation;

		if (!body.userId || !body.vehicle || !body.parkingId || !body.startTime) {
			return NextResponse.json({ message: "Incomplete request body." }, { status: 400 });
		}

		const date = body.date ? new Date(body.date) : undefined;

		const newReservation = await db.transaction(async (tx) => {
			const res = await tx
				.insert(reservation)
				.values({ ...body, date })
				.returning();
			// also update the parking spot to be unavailable
			await db
				.update(parkingSpot)
				.set({ availability: false })
				.where(eq(parkingSpot.id, body.parkingId));

			return res;
		});

		return NextResponse.json({
			message: "Successfully created reservation.",
			reservation: newReservation[0],
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}
