import mongoose from "mongoose";
import { Document } from "mongoose";

interface MessageType extends Document {
    senderId:mongoose.Schema.Types.ObjectId,
    recieverId:mongoose.Schema.Types.ObjectId,
    message:String,
}

const messageSchema = new mongoose.Schema <MessageType>({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    message:{
        type:String,
        required:true
    }
})

const Message = mongoose.model<MessageType>('Message',messageSchema)
export default Message;