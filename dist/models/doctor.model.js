import { Schema, SchemaTypes, model } from "mongoose";
const doctorSchema = new Schema({
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
});
export const DoctorModel = model('Doctor', doctorSchema);
