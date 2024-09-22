import Joi from 'joi';
export const updateDoctorSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    imageUrl: Joi.string().required(),
    specialty: Joi.string().required(),
});
export const createDoctorSchema = Joi.object({
    updateDoctorSchema,
    rating: Joi.number().min(0).max(5),
});
