import * as express from "express";
import { emailVerify, signIn, signUp } from "./user.controller.js";
import { validation } from "../../middleware/validation/validation.middleware.js";
import { loginSchema, signupSchema } from "./user.validation.js";
const router = express.Router();
router.post('/signup', validation(signupSchema, 'body'), signUp);
router.post('/login', validation(loginSchema, 'body'), signIn);
router.get('/verify/:token', emailVerify);
export const userRouter = router;
