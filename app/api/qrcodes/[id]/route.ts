import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { QrCode, qrCode } from "~/lib/schema";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);

		if (!id || isNaN(id)) {
			return NextResponse.json({ message: "Invalid ID." }, { status: 400 });
		}

		const returnedQrCode = await db.query.qrCode.findFirst({ where: eq(qrCode.id, id) });
		if (!returnedQrCode) {
			return NextResponse.json({ message: "QR code not found." }, { status: 404 });
		}

		return NextResponse.json({
			message: `Successfully fetched QR code ${id}`,
			qrCode: returnedQrCode,
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

		const body = (await request.json()) as Partial<QrCode>;

		const returnedQrCode = await db
			.update(qrCode)
			.set(body)
			.where(eq(qrCode.id, id))
			.returning();

		return NextResponse.json({
			message: `Successfully updated QR code id ${id}`,
			qrCode: returnedQrCode[0],
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

		const returnedQrCode = await db.delete(qrCode).where(eq(qrCode.id, id)).returning();

		return NextResponse.json({
			message: `Successfully deleted QR code id ${id}`,
			qrCode: returnedQrCode[0],
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}
