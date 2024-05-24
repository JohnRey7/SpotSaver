import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { Vehicle, vehicle } from "~/lib/schema";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);

		if (!id || isNaN(id)) {
			return NextResponse.json({ message: "Invalid ID." }, { status: 400 });
		}

		const returnedVehicle = await db.query.vehicle.findFirst({ where: eq(vehicle.id, id) });
		if (!returnedVehicle) {
			return NextResponse.json({ message: "Vehicle not found." }, { status: 404 });
		}

		return NextResponse.json({
			message: `Successfully fetched vehicle ${id}`,
			vehicle: returnedVehicle,
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

		const body = (await request.json()) as Partial<Vehicle>;

		const returnedVehicle = await db
			.update(vehicle)
			.set(body)
			.where(eq(vehicle.id, id))
			.returning();

		return NextResponse.json({
			message: `Successfully updated vehicle id ${id}`,
			vehicle: returnedVehicle[0],
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

		const returnedVehicle = await db.delete(vehicle).where(eq(vehicle.id, id)).returning();

		return NextResponse.json({
			message: `Successfully deleted vehicle id ${id}`,
			vehicle: returnedVehicle[0],
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}
