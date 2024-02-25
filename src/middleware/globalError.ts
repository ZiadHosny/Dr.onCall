import { NextFunction, Request, Response } from "express"
import { getFromEnv } from "../utils/getFromEnv.js"

export const globalErrorMiddleware = (err: any, _: Request, res: Response, __: NextFunction) => {
    const { mode } = getFromEnv()
    if (mode == 'dev') {
        devMode(err, res)
    } else {
        prodMode(err, res)
    }
}

const prodMode = (err: any, res: Response) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({ message: err.message })
}

const devMode = (err: any, res: Response) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        message: err.message,
        status: statusCode,
        // stack: err.stack
    })
}
