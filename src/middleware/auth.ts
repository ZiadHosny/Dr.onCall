import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getFromEnv } from '../utils/getFromEnv.js'


export const auth = (req: Request, res: Response, next: NextFunction) => {

    const { secretKey } = getFromEnv()
    const token = req.header('token')

    if (!token) {
        return res.json({ message: 'Send the token In Headers' })
    }
    jwt.verify(token, secretKey, (err: any, decode: any) => {
        if (err) {
            res.json(err)
        }
        else if (decode) {
            req.body.userId = decode.userId
            next()
        }
    })
}