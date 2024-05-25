import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { Payment, payment } from "~/lib/schema";

export async function GET(request: NextRequest) {
	try {
		const payments = await db.query.payment.findMany({ with: { reservation: true } });

		return NextResponse.json(
			{ message: "Successfully fetched all payments.", payments },
			{ status: 200 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as Payment;

		if (!body.userId || !body.reservationId || !body.amount || !body.methodOfPayment) {
			return NextResponse.json({ message: "Incomplete request body." }, { status: 400 });
		}

		const newPayment = await db
			.insert(payment)
			.values({ ...body, status: body.status || "PENDING" })
			.returning();

		return NextResponse.json({
			message: "Successfully created payment.",
			payment: newPayment[0],
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}
