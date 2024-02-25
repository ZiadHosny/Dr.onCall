import { Request, Response } from "express";
import { MessageModel } from "../../models/message.model.js";
import { catchAsyncError } from "../../utils/AppError.js"

export const addMessage = catchAsyncError(async (req: Request, res: Response) => {

    const { message, userId } = req.body

    await MessageModel.insertMany({ message, userId })

    res.json({ message: 'Added Successfully' })
})

export const allMessage = catchAsyncError(async (req: Request, res: Response) => {

    const { userId } = req.body;

    const messages = await MessageModel.find({ userId }, { message: 1, _id: 0 })

    res.json({ message: 'success', messages })
})