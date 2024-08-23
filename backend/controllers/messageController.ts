import { Request, Response } from "express";
import Message from "../models/messageModel";
import Course from "../models/courseModel";
import { messageSchema } from "../schemas/messageSchema";
import Conversation from "../models/conversationModel";
import mongoose from "mongoose";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const message = messageSchema.safeParse(req.body);
    const { id: recieverId } = req.params;
    if (!req.user) {
      return res.status(401).json({
        message: "User is not authenticated",
      });
    }
    const senderId = req.user._id;
    if (!message.success) {
      return res.status(400).json({
        message: message.error.issues[0].message,
      });
    }
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, recieverId],
      },
    });
    if(!conversation){
        conversation=await Conversation.create({
        participants:[senderId, recieverId],
        });
    }
    const newMessage = await Message.create({
        senderId:senderId,
        recieverId:recieverId,
        message:message.data.message
    })
    if(!newMessage){
        return res.status(500).json({
            message:"Something went wrong while creating message",
        })
    }
    if(newMessage){
        conversation.messages.push(newMessage._id as mongoose.Schema.Types.ObjectId);
    }
    await Promise.all([conversation.save(),newMessage.save()])
    return res.status(201).json({
        message: "Message sent successfully",
        MSG: newMessage.message,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
