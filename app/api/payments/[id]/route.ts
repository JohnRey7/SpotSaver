import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { Payment, notification, parkingSpot, payment } from "~/lib/schema";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = params.id;

		if (!id) {
			return NextResponse.json({ message: "Invalid user ID." }, { status: 400 });
		}

		const returnedPayments = await db.query.payment.findMany({
			where: eq(payment.userId, id),
			with: { reservation: { with: { parkingSpot: true } } },
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

		const paymentToDelete = await db.query.payment.findFirst({
			where: eq(payment.id, id),
			with: { reservation: true },
		});

		if (!paymentToDelete) {
			return NextResponse.json(
				{ message: `Payment with id ${id} not found.` },
				{ status: 404 }
			);
		}

		const returnedPayment = await db.transaction(async (tx) => {
			const res = await tx.delete(payment).where(eq(payment.id, id)).returning();
			await tx
				.update(parkingSpot)
				.set({ availability: true })
				.where(eq(parkingSpot.id, paymentToDelete.reservation.parkingId));
			await tx
				.insert(notification)
				.values({ type: "CANCEL", userId: paymentToDelete.userId });
			return res;
		});

		return NextResponse.json({
			message: `Successfully deleted payment id ${id}`,
			payment: returnedPayment[0],
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "An error occurred." }, { status: 500 });
	}
}
