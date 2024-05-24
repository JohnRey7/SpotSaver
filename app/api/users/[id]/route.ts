import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	// get a user by id
	return NextResponse.json({ test: "Successful GET /users/[id]", id: params.id });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	// update a user by id
	const body = await request.json();
	return NextResponse.json({ test: "Successful PUT /users/[id]", id: params.id, body });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	// delete a user by id
	return NextResponse.json({ test: "Successful DELETE /users/[id]", id: params.id });
}
