import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { Reservation, reservation } from "~/lib/schema";

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

		const newReservation = await db.insert(reservation).values(body).returning();

		return NextResponse.json({
			message: "Successfully created reservation.",
			reservation: newReservation,
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}
