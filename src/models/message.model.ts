import { Schema, SchemaTypes, model } from "mongoose";
import { Message } from "../utils/types.js";

const messageSchema = new Schema<Message>({
    message: {
        type: String,
        required: true
    },
    userId: SchemaTypes.ObjectId
}, {
    timestamps: true
})


export const MessageModel = model('message', messageSchema)