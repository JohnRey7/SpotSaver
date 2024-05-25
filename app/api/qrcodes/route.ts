import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { QrCode, qrCode } from "~/lib/schema";

export async function GET(request: NextRequest) {
	try {
		const qrCodes = await db.query.qrCode.findMany();

		return NextResponse.json(
			{ message: "Successfully fetched all QR codes.", qrCodes },
			{ status: 200 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as QrCode;

		if (!body.reservationId || !body.code) {
			return NextResponse.json({ message: "Incomplete request body." }, { status: 400 });
		}

		const newQrCode = await db.insert(qrCode).values(body).returning();

		return NextResponse.json({
			message: "Successfully created QR code.",
			qrCode: newQrCode[0],
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}
