import * as bcrypt from 'bcrypt';
import { userModel } from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import { getFromEnv } from "../../utils/getFromEnv.js";
import { catchAsyncError } from "../../utils/AppError.js";
import { sendEmail } from "../../utils/email/sendEmail.js";
import { AppError } from "../../utils/AppError.js";
import { sendResponse } from "../../utils/response.js";
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
                return res.json({ message: 'error when hashing password', err });
            }
            await userModel.insertMany({
                name,
                email,
                password: hash,
                phone,
            });
            const token = jwt.sign({ email }, secretKey);
            const emailMessage = await sendEmail({ userEmail: email, token, subject: "Verification From Blood Donation App" });
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
        const match = await bcrypt.compare(password, user?.password);
        const { _id: userId, name, isVerified, isActive, type } = user;
        if (match) {
            const token = jwt.sign({ userId, name, isVerified }, secretKey);
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
                res.json({ message: "Email Verified" });
            }
            else {
                res.json({ message: "Email Not found" });
            }
        }
    });
});
