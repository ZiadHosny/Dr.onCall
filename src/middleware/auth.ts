import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getFromEnv } from '../utils/getFromEnv.js'
import { AppError, catchAsyncError } from '../utils/AppError.js'
import { AuthRequest } from '../utils/types.js'

export const auth = catchAsyncError(async (req: AuthRequest, res: Response, next: NextFunction) => {

    const { secretKey } = getFromEnv()
    const token = req.headers['authorization']?.split('Bearer ')[1]

    if (!token) {
        return next(new AppError('Not authorized, no token', 401))
    }

    try {
        jwt.verify(token, secretKey, (err: any, decode: any) => {
            if (err) {
                return next(new AppError(err, 401))
            }
            else if (decode) {
                req.user = decode
                next()
            }
        })
    } catch (err) {
        console.error(err);
        return next(new AppError('Not authorized, token failed', 401))
    }
})