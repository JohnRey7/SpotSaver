import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { Payment, payment } from "~/lib/schema";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = params.id;

		if (!id) {
			return NextResponse.json({ message: "Invalid ID." }, { status: 400 });
		}

		const returnedPayments = await db.query.payment.findMany({
			where: eq(payment.userId, id),
			with: { reservation: true },
		});

		return NextResponse.json({
			message: `Successfully fetched payments from user id ${id}`,
			payments: returnedPayments,
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

		const body = (await request.json()) as Partial<Payment>;

		const returnedPayment = await db
			.update(payment)
			.set(body)
			.where(eq(payment.id, id))
			.returning();

		return NextResponse.json({
			message: `Successfully updated payment id ${id}`,
			payment: returnedPayment[0],
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

		const returnedPayment = await db.delete(payment).where(eq(payment.id, id)).returning();

		return NextResponse.json({
			message: `Successfully deleted payment id ${id}`,
			payment: returnedPayment[0],
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}
