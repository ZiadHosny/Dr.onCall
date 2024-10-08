import * as express from 'express';
import { addDoctor, allDoctors, updateDoctor } from './doctor.controller.js';
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation/validation.middleware.js';
import { createDoctorSchema, updateDoctorSchema } from './doctor.validation.js';
import { allowedTo } from '../../middleware/allowedTo.middleware.js';
import { Role } from '../user/user.interface.js';

const router = express.Router();

router
  .route('/')
  .all(auth)
  .post(
    allowedTo(Role.SuperAdmin, Role.Admin),
    validation(createDoctorSchema, 'body'),
    addDoctor,
  )
  .get(allDoctors);

router.put(
  '/:id',
  allowedTo(Role.SuperAdmin, Role.Admin),
  validation(updateDoctorSchema, 'body'),
  updateDoctor,
);

export const doctorRouter = router;
