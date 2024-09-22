import { NextFunction, Request, Response } from "express"
import * as bcrypt from 'bcrypt'
import { userModel } from "../../models/user.model.js"
import jwt from "jsonwebtoken"
import { getFromEnv } from "../../utils/getFromEnv.js"
import { sendEmail } from "../../utils/email/sendEmail.js"
import { AppLocalizedError } from "../../utils/AppError.js"
import { sendLocalizedResponse } from "../../utils/response.js"
import { APP_NAME, ROUNDS } from "../../utils/constants.js"
import { catchAsyncError } from "../../utils/catchAsyncError.js"
import { StatusCodes } from "http-status-codes"
import { AuthRequest } from "./user.interface.js"

export const signUp = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, password, phone } = req.body
    const { secretKey, rounds } = getFromEnv()
    const user = await userModel.findOne({ email })
    if (user) {
        next(new AppLocalizedError(
            {
                ar: 'الحساب موجود بالفعل. يرجى تسجيل الدخول أو إعادة تعيين كلمة المرور.',
                en: "Account already exists. Please log in or reset your password."
            },
            StatusCodes.CONFLICT,
        ));
    } else {
        bcrypt.hash(password, rounds, async (err, hash) => {
            if (err) {
                return next(new AppLocalizedError(
                    {
                        ar: "حدث خطأ أثناء تشفير كلمة المرور. يرجى المحاولة لاحقًا.",
                        en: "An error occurred while hashing the password. Please try again later."
                    },
                ))
            }
            await userModel.insertMany({
                name,
                email,
                password: hash,
                phone,
            })

            const token = jwt.sign({ email }, secretKey)
            const emailMessage = await sendEmail({ userEmail: email, token, subject: `Verification From ${APP_NAME} App` })

            sendLocalizedResponse({
                res,
                req,
                message: {
                    ar: 'تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول',
                    en: "Account created successfully. You can now log in.",
                },
                data: emailMessage,
                status: StatusCodes.CREATED
            })
        })
    }
})

export const signIn = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const { secretKey } = getFromEnv()

    const user = await userModel.findOne({ email })

    if (user) {
        const match = await bcrypt.compare(password, user.password)

        const { _id: userId, name, isVerified, isActive, type } = user

        if (match) {
            const token = jwt.sign({
                userId,
                name,
                isVerified,
                password: user.password,
                email,
                type,
            }, secretKey)

            if (isVerified && isActive) {
                sendLocalizedResponse({
                    res,
                    req,
                    message: {
                        ar: "تم تسجيل الدخول بنجاح.",
                        en: "Logged in successfully.",
                    },
                    data: {
                        token,
                        user: {
                            name,
                            email,
                            type,
                        }
                    },
                    status: StatusCodes.OK
                })
            } else {
                next(new AppLocalizedError(
                    {
                        ar: "يرجى تأكيد بريدك الإلكتروني أولاً.",
                        en: "Please confirm your email first.",
                    },
                    StatusCodes.FORBIDDEN
                ))
            }
        }
        else {
            next(new AppLocalizedError(
                {
                    ar: "كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.",
                    en: "Incorrect password. Please try again.",
                },
                StatusCodes.UNAUTHORIZED
            ))
        }
    } else {
        next(new AppLocalizedError(
            {
                ar: "لم يتم العثور على الحساب. يرجى التحقق من المعلومات المقدمة.",
                en: "Account not found. Please check the provided information.",
            },
            StatusCodes.NOT_FOUND
        ))
    }

})

export const emailVerify = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { secretKey } = getFromEnv()

    jwt.verify(token, secretKey, async (err, decoded: any) => {
        if (err) {
            next(new AppLocalizedError(
                {
                    ar: "لم يتم العثور على البريد الإلكتروني. يرجى التحقق من المعلومات المقدمة.",
                    en: "Email not found. Please check the provided information.",
                },
                StatusCodes.NOT_FOUND
            ))
        } else {
            const { email } = decoded
            const user = await userModel.findOne({ email })
            if (user) {
                await userModel.findOneAndUpdate({ email }, { isVerified: true })
                sendLocalizedResponse({
                    req,
                    res,
                    message: {
                        ar: "تم تأكيد بريدك الإلكتروني بنجاح.",
                        en: "Your email has been successfully verified.",
                    },
                    status: StatusCodes.OK
                })
            } else {

                return next(new AppLocalizedError(
                    {
                        ar: "لم يتم العثور على البريد الإلكتروني. يرجى التحقق من المعلومات المقدمة.",
                        en: "Email not found. Please check the provided information.",
                    },
                    StatusCodes.NOT_FOUND
                ))
            }
        }
    })
})

export const changePassword = catchAsyncError(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { password, newPassword } = req.body
    const { userId } = req.user

    // Verify current password
    const isPasswordValid = await bcrypt.compare(password, req.user.password);
    if (!isPasswordValid) {
        return next(new AppLocalizedError(
            {
                ar: "كلمة المرور الحالية غير صحيحة.",
                en: "Current password is incorrect."
            },
            StatusCodes.UNAUTHORIZED
        ))
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, ROUNDS);

    await userModel.findByIdAndUpdate(userId, { password: hashedPassword })

    return sendLocalizedResponse({
        req,
        res,
        message: {
            ar: "تم تغيير كلمة المرور بنجاح.",
            en: "Password changed successfully.",
        },
        status: StatusCodes.OK
    })
})