import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { Vehicle, vehicle } from "~/lib/schema";

export async function GET(request: NextRequest) {
	try {
		const vehicles = await db.query.vehicle.findMany();

		return NextResponse.json(
			{ message: "Successfully fetched all vehicles.", vehicles },
			{ status: 200 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as Vehicle;

		if (!body.name) {
			return NextResponse.json({ message: "Incomplete request body." }, { status: 400 });
		}

		const newVehicle = await db.insert(vehicle).values(body).returning();

		return NextResponse.json({
			message: "Successfully created vehicle.",
			vehicle: newVehicle,
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}
