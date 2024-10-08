import * as express from 'express';
import {
  addNewSymptom,
  allSymptoms,
  deleteSymptom,
  getSymptomById,
  updateSymptom,
} from './symptom.controller.js';
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation/validation.middleware.js';
import { allowedTo } from '../../middleware/allowedTo.middleware.js';
import { Role } from '../user/user.interface.js';
import { symptomSchema } from './symptom.validation.js';
import { validationId } from '../../middleware/validation/validationId.middleware.js';

const router = express.Router();

router
  .route('/')
  .all(auth)
  .post(
    allowedTo(Role.SuperAdmin, Role.Admin),
    validation(symptomSchema, 'body'),
    addNewSymptom,
  )
  .get(allSymptoms);

router
  .route('/:id')
  .all(auth, validationId(), allowedTo(Role.SuperAdmin, Role.Admin))
  .get(getSymptomById)
  .put(validation(symptomSchema, 'body'), updateSymptom)
  .delete(deleteSymptom);

export const symptomRouter = router;
