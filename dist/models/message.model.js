import { Schema, SchemaTypes, model } from "mongoose";
const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    userId: SchemaTypes.ObjectId
}, {
    timestamps: true
});
export const MessageModel = model('message', messageSchema);
