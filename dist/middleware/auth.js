import jwt from 'jsonwebtoken';
import { getFromEnv } from '../utils/getFromEnv.js';
import { AppError, catchAsyncError } from '../utils/AppError.js';
export const auth = catchAsyncError(async (req, res, next) => {
    const { secretKey } = getFromEnv();
    const token = req.headers['authorization']?.split('Bearer ')[1];
    if (!token) {
        return next(new AppError('Not authorized, no token', 401));
    }
    try {
        jwt.verify(token, secretKey, (err, decode) => {
            if (err) {
                return next(new AppError(err, 401));
            }
            else if (decode) {
                req.user = decode;
                next();
            }
        });
    }
    catch (err) {
        console.error(err);
        return next(new AppError('Not authorized, token failed', 401));
    }
});
