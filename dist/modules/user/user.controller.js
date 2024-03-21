import * as bcrypt from 'bcrypt';
import { userModel } from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import { getFromEnv } from "../../utils/getFromEnv.js";
import { catchAsyncError } from "../../utils/AppError.js";
import { sendEmail } from "../../utils/email/sendEmail.js";
import { AppError } from "../../utils/AppError.js";
import { sendResponse } from "../../utils/response.js";
import { APP_NAME, ROUNDS } from "../../utils/constants.js";
export const signUp = catchAsyncError(async (req, res, next) => {
    const { name, email, password, phone } = req.body;
    const { secretKey, rounds } = getFromEnv();
    const user = await userModel.findOne({ email });
    if (user) {
        next(new AppError("Account Already Exist.", 400));
    }
    else {
        bcrypt.hash(password, rounds, async (err, hash) => {
            if (err) {
                return next(new AppError('error when hashing password', 400));
            }
            await userModel.insertMany({
                name,
                email,
                password: hash,
                phone,
            });
            const token = jwt.sign({ email }, secretKey);
            const emailMessage = await sendEmail({ userEmail: email, token, subject: `Verification From ${APP_NAME} App` });
            sendResponse({
                res,
                status: 200,
                message: "success",
                data: emailMessage
            });
        });
    }
});
export const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    const { secretKey } = getFromEnv();
    const user = await userModel.findOne({ email });
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        const { _id: userId, name, isVerified, isActive, type } = user;
        if (match) {
            const token = jwt.sign({
                userId,
                name,
                isVerified,
                password: user.password,
                email,
                type,
            }, secretKey);
            if (isVerified && isActive) {
                sendResponse({
                    res,
                    message: "Login Ok",
                    status: 200,
                    data: {
                        token,
                        user: {
                            name,
                            email,
                            type,
                        }
                    }
                });
            }
            else {
                next(new AppError("Confirm Your Email First", 400));
            }
        }
        else {
            next(new AppError("Password Incorrect", 400));
        }
    }
    else {
        next(new AppError("account Not Found", 400));
    }
});
export const emailVerify = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;
    const { secretKey } = getFromEnv();
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            next(new AppError("Email Not found", 500));
        }
        else {
            const { email } = decoded;
            const user = await userModel.findOne({ email });
            if (user) {
                await userModel.findOneAndUpdate({ email }, { isVerified: true });
                sendResponse({ res, status: 200, message: "Email Verified" });
            }
            else {
                return next(new AppError("Email Not found", 400));
            }
        }
    });
});
export const changePassword = catchAsyncError(async (req, res, next) => {
    const { password, newPassword } = req.body;
    const { userId } = req.user;
    // Verify current password
    const isPasswordValid = await bcrypt.compare(password, req.user.password);
    if (!isPasswordValid) {
        return next(new AppError("Current password is incorrect", 400));
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, ROUNDS);
    await userModel.findByIdAndUpdate(userId, { password: hashedPassword });
    return sendResponse({ res, status: 201, message: "Password changed successfully" });
});
