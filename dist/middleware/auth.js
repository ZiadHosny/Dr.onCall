import jwt from 'jsonwebtoken';
import { getFromEnv } from '../utils/getFromEnv.js';
import { AppLocalizedError } from '../utils/AppError.js';
import { catchAsyncError } from '../utils/catchAsyncError.js';
import { StatusCodes } from 'http-status-codes';
import { Messages } from '../utils/Messages.js';
export const auth = catchAsyncError(async (req, res, next) => {
    const { secretKey } = getFromEnv();
    const token = req.headers['authorization']?.split('Bearer ')[1];
    if (!token) {
        return next(new AppLocalizedError(Messages.noToken, StatusCodes.UNAUTHORIZED));
    }
    try {
        jwt.verify(token, secretKey, (err, decode) => {
            if (err) {
                return next(new AppLocalizedError(Messages.invalidToken, StatusCodes.UNAUTHORIZED));
            }
            else if (decode) {
                req.user = decode;
                next();
            }
        });
    }
    catch (err) {
        return next(new AppLocalizedError(Messages.invalidToken, StatusCodes.UNAUTHORIZED));
    }
});
