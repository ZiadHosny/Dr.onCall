import { Schema, SchemaTypes, model } from "mongoose";
import { Doctor } from "../modules/doctor/doctor.interface.js";

const doctorSchema = new Schema<Doctor>({
    imageUrl: {
        type: String,
        required: true,
        trim: true,
    },
    specialty: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    userRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
})


export const DoctorModel = model('Doctor', doctorSchema)