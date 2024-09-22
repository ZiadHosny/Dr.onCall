import * as express from "express";
import { addDoctor, allDoctors, updateDoctor } from "./doctor.controller.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation/validation.middleware.js";
import { createDoctorSchema, updateDoctorSchema } from "./doctor.validation.js";
const router = express.Router();
router
    .route('/')
    .post(validation(createDoctorSchema, 'body'), addDoctor)
    .get(auth, allDoctors);
router.put('/:id', validation(updateDoctorSchema, 'body'), updateDoctor);
export const doctorRouter = router;
