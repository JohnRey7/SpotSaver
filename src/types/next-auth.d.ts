import NextAuth from "next-auth"
import type {User} from 'next-auth'
import { UserRole } from "@prisma/client"

type UserId = string

declare module 'next-auth/jwt'{
    interface JWT{
        id: UserId
        role: UserRole
        email: UserId
    }
}

declare module "next-auth"{
    interface User{
        email: string
        role: UserRole
    }
    interface Session{
        user: User &{
            email: string
            role: UserRole
        }
       
    }
}