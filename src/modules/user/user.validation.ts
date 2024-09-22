import Joi from 'joi';

export const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  type: Joi.string().valid(...['doctor', 'user']),
  // gender: Joi.string().required().valid(...['Male', "Female"]),
  // password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
  // dateOfBirth: Joi.number().required().integer().min(1900).max(2020),
  // bloodType: Joi.number().required().valid(...BLOOD_TYPES),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
  password: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmNewPassword: Joi.string().required().valid(Joi.ref('newPassword')),
});
