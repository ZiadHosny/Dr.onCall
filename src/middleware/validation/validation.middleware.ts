import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { logBlueMsg } from "../../utils/console/log.js"
import { AppError } from "../../utils/AppError.js"

export const validation = (schema: Joi.ObjectSchema, reqPart: 'params' | 'body') => {

    return (req: Request, res: Response, next: NextFunction) => {
        const body = JSON.parse(JSON.stringify(req[reqPart]))
        const { error } = schema.validate(body, { abortEarly: true })

        console.log("Validate", body)
        logBlueMsg(`Validation for request part:  ${reqPart}`);

        return error ?
            next(new AppError(error.message, 400, error.details)) :
            next()
    }
}