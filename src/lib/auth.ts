import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Johndoe@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const existingUser = await db.user.findUnique({
                    where: { email: credentials.email }
                });
                if (!existingUser) {
                    return null;
                }
                const passwordMatch = await compare(credentials.password, existingUser.password);
                if (!passwordMatch) {
                    return null;
                }
                // Ensure the user object includes the role
                return {
                    id: `${existingUser.id}`,
                    email: existingUser.email,
                    role: existingUser.role
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Assign role to the token if user object is available
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            // Ensure session contains email and role from the token
            session.user = {
                ...session.user,
                email: token.email,
                role: token.role
            };
            return session;
        },
    }
}
