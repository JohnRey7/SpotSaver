import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from 'bcrypt';
import * as z from 'zod';

interface contextProps {
    params: {
        userId: string
    }
}

const userSchema = z
  .object({
    firstname: z.string().min(1, 'firstname is required').max(100),
    lastname: z.string().min(1, 'lastname is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have more than 8 characters'),
  });

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstname, lastname, email, password } = userSchema.parse(body);

        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists!" }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword
            }
        });
        const { password: newUserPassword, ...rest } = newUser;
        return NextResponse.json({ user: rest, message: "User created successfully!" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}


