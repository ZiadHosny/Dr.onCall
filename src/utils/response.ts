import { Response } from "express"

type SendResponseType = {
    res: Response,
    status: number,
    message: string,
    page?: number,
    data: any
}

export const sendResponse = ({ res, status, message, page, data }: SendResponseType) => {

    const response = { message, status, data }

    const sendedData = page ? { ...response, page } : response
    return res.status(status).send(sendedData)
}