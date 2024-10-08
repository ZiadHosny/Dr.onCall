import express, { Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { userRouter } from './modules/user/user.router.js';
import { doctorRouter } from './modules/doctor/doctor.router.js';
import { baseRouter } from './modules/baseRouter.js';
import { invalidRouter } from './modules/invalidRouter.js';
import { globalErrorMiddleware } from './middleware/globalError.js';
import { getFromEnv } from './utils/getFromEnv.js';
import { symptomRouter } from './modules/symptom/symptom.router.js';

const { mode } = getFromEnv();

const router = Router();

//Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static('public'));
router.use('/uploads', express.static('uploads'));
router.use(cors());

if (mode == 'dev') {
  router.use(morgan('dev'));
}

//routes
router.use('/', baseRouter);
router.use('/api', baseRouter);
router.use('/api/users', userRouter);
router.use('/api/doctors', doctorRouter);
router.use('/api/symptoms', symptomRouter);

// default Routes
router.use('*', invalidRouter);
router.use(globalErrorMiddleware);

export default router;
