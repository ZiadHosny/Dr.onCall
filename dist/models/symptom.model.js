import { Schema, model } from 'mongoose';
const symptomSchema = new Schema({
    symptomEn: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 2,
    },
    symptomAr: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 2,
    },
}, { timestamps: true });
export const SymptomModel = model('Symptom', symptomSchema);
