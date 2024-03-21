import { Request } from "express";

export interface AuthRequest extends Request {
    user: {
        userId: string,
        name: string,
        isVerified: boolean,
        password: string,
        iat: number,
        email: string,
        type: "doctor" | "user",
    }
}

export type User = {
    name: string,
    email: string,
    password: string,
    phone: string,
    type: "doctor" | "user",
    isActive: boolean,
    isVerified: boolean,


    // gender: "Male" | "Female",
    // bloodType: String,
    // dateOfBirth: number,
}

export type EmailData = {
    userEmail: string;
    subject: string;
    token: string
}

export type EmailHtml = {
    token: string,
}

export type Message = {
    message: string,
    userId: string,
}