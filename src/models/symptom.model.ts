import { Schema, model } from 'mongoose';
import { Symptom } from '../modules/symptom/symptom.interface.js';

const symptomSchema = new Schema<Symptom>(
  {
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
  },
  { timestamps: true },
);

export const SymptomModel = model('Symptom', symptomSchema);
