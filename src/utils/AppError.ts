import { NextFunction, Request, Response } from "express"

export const catchAsyncError = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((err: any) => {
            next(err)
        })
    }
}

export class AppError extends Error {
    statusCode: number = 500
    details: any;
    constructor(message: string, statusCode: number, details?: any) {
        super(message)
        this.statusCode = statusCode
        this.details = details
    }
}