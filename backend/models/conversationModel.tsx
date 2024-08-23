import mongoose from "mongoose";
import { Document } from "mongoose";

interface ConversationType extends Document {
    participants:mongoose.Schema.Types.ObjectId[];
    messages:mongoose.Schema.Types.ObjectId[];
}

const conversationSchema = new mongoose.Schema<ConversationType>({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message',
        default:[]
    }
  ]
});

const Conversation = mongoose.model<ConversationType>("Conversation",conversationSchema);
export default Conversation;
