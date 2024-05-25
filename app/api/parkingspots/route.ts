import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { ParkingSpot, parkingSpot } from "~/lib/schema";

export async function GET(request: NextRequest) {
	try {
		// get all parkingspots
		const parkingspots = await db.query.parkingSpot.findMany();

		return NextResponse.json(
			{ message: "Successfully fetched all parking spots.", parkingspots },
			{ status: 200 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as ParkingSpot;

		if (
			!body.location ||
			typeof body.availability === undefined ||
			typeof body.availability === null
		) {
			return NextResponse.json({ message: "Incomplete request body." }, { status: 400 });
		}

		// create a new parkingspot
		const newSpot = await db.insert(parkingSpot).values(body).returning();

		return NextResponse.json({
			message: "Successfully created parking spot.",
			parkingSpot: newSpot[0],
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}
