import { ObjectId } from "mongoose";

export type Doctor = {
    user: ObjectId,
    imageUrl: string,
    specialty: string,
    rating: number,
    userRating: number | null,
}