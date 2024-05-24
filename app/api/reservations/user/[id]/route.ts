import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { Reservation, reservation } from "~/lib/schema";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = params.id;

		if (!id) {
			return NextResponse.json({ message: "Invalid user ID." }, { status: 400 });
		}

		const returnedReservation = await db.query.reservation.findFirst({
			where: eq(reservation.userId, id),
		});
		if (!returnedReservation) {
			return NextResponse.json({ message: "Reservation not found." }, { status: 404 });
		}

		return NextResponse.json({
			message: `Successfully fetched reservation from user id ${id}`,
			reservation: returnedReservation,
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
			return NextResponse.json({ message: "Invalid user ID." }, { status: 400 });
		}

		const body = (await request.json()) as Partial<Reservation>;

		const returnedReservation = await db
			.update(reservation)
			.set(body)
			.where(eq(reservation.userId, id))
			.returning();

		return NextResponse.json({
			message: `Successfully updated reservation from user id ${id}`,
			reservation: returnedReservation[0],
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
			return NextResponse.json({ message: "Invalid user ID." }, { status: 400 });
		}

		const returnedReservation = await db
			.delete(reservation)
			.where(eq(reservation.userId, id))
			.returning();

		return NextResponse.json({
			message: `Successfully deleted reservation from user id ${id}`,
			reservation: returnedReservation[0],
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}
