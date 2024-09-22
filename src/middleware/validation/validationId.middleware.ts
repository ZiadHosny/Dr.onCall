import Joi from 'joi';
import { validation } from './validation.middleware.js';

export const idSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const validationId = () => {
  return validation(idSchema, 'params');
};
