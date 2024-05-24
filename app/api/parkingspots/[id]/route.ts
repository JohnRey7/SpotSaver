import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { ParkingSpot, parkingSpot } from "~/lib/schema";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);

		if (!id || isNaN(id)) {
			return NextResponse.json({ message: "Invalid ID." }, { status: 400 });
		}

		const spot = await db.query.parkingSpot.findFirst({ where: eq(parkingSpot.id, id) });
		if (!spot) {
			return NextResponse.json({ message: "Parking spot not found." }, { status: 404 });
		}

		return NextResponse.json({
			message: `Successfully fetched parking spot id ${id}`,
			parkingSpot: spot,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);

		if (!id || isNaN(id)) {
			return NextResponse.json({ message: "Invalid ID." }, { status: 400 });
		}

		const body = (await request.json()) as Partial<ParkingSpot>;

		const spot = await db
			.update(parkingSpot)
			.set(body)
			.where(eq(parkingSpot.id, id))
			.returning();

		return NextResponse.json({
			message: `Successfully updated parking spot id ${id}`,
			parkingSpot: spot[0],
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);

		if (!id || isNaN(id)) {
			return NextResponse.json({ message: "Invalid ID." }, { status: 400 });
		}

		const spot = await db.delete(parkingSpot).where(eq(parkingSpot.id, id)).returning();

		return NextResponse.json({
			message: `Successfully deleted parking spot id ${id}`,
			parkingSpot: spot[0],
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}
