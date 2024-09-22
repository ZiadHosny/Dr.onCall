import { NextFunction, Request, Response } from "express"

export const catchAsyncError = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((err: any) => {
            next(err)
        })
    }
}