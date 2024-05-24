import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	// get all users
	return NextResponse.json({ test: "Successful GET /users" });
}

export async function POST(request: NextRequest) {
	// create a new user
	const body = await request.json();
	return NextResponse.json({ test: "Successful POST /users", body });
}
