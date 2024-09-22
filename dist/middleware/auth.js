import jwt from 'jsonwebtoken';
import { getFromEnv } from '../utils/getFromEnv.js';
import { AppLocalizedError } from '../utils/AppError.js';
import { catchAsyncError } from '../utils/catchAsyncError.js';
import { StatusCodes } from 'http-status-codes';
export const auth = catchAsyncError(async (req, res, next) => {
    const { secretKey } = getFromEnv();
    const token = req.headers['authorization']?.split('Bearer ')[1];
    if (!token) {
        return next(new AppLocalizedError({
            ar: "غير مصرح، لا يوجد رمز.",
            en: "Not authorized, no token."
        }, StatusCodes.UNAUTHORIZED));
    }
    try {
        jwt.verify(token, secretKey, (err, decode) => {
            if (err) {
                return next(new AppLocalizedError({
                    ar: "رمز التحقق غير صالح.",
                    en: "Verification token is invalid.",
                }, StatusCodes.UNAUTHORIZED));
            }
            else if (decode) {
                req.user = decode;
                next();
            }
        });
    }
    catch (err) {
        return next(new AppLocalizedError({
            ar: "رمز التحقق غير صالح.",
            en: "Verification token is invalid.",
        }, StatusCodes.UNAUTHORIZED));
    }
});
