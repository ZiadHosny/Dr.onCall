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