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

export enum Gender {
    Male = "male",
    Female = "female",
}

export enum Role {
    RootAdmin = "rootAdmin",
    AdminA = "adminA",
    AdminB = "adminB",
    AdminC = "adminC",
    SubAdmin = "subAdmin",
    USER = "user",
    Guest = "guest",
    Marketer = "marketer",
}

export interface IRole {
    rootAdmin: string;
    adminA: string;
    adminB: string;
    adminC: string;
    subAdmin: string;
    user: string;
    guest: string;
    marketer: string;
}
