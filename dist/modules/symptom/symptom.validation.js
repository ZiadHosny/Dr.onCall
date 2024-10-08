import Joi from 'joi';
export const symptomSchema = Joi.object({
    symptomEn: Joi.string().min(2).max(30).required(),
    symptomAr: Joi.string().min(2).max(30).required(),
});
