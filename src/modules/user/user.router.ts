import * as express from "express";
import { changePassword, emailVerify, signIn, signUp } from "./user.controller.js";
import { validation } from "../../middleware/validation/validation.middleware.js";
import { changePasswordSchema, loginSchema, signupSchema } from "./user.validation.js";
import { auth } from "../../middleware/auth.js";

const router = express.Router()

router.post('/signup', validation(signupSchema, 'body'), signUp)
router.post('/login', validation(loginSchema, 'body'), signIn)
router.patch('/changePassword', auth, validation(changePasswordSchema, 'body'), changePassword)
router.get('/verify/:token', emailVerify)


export const userRouter = router