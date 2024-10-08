import { SymptomModel } from '../models/symptom.model.js';
export const setDummyData = async () => {
    for (let i = 100; i < 200; i++) {
        await SymptomModel.create({
            symptomEn: `En ${i}`,
            symptomAr: `Ar ${i}`,
        });
    }
};
