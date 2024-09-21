import { Request, Response } from "express";
import Message from "../models/messageModel";
import Course from "../models/courseModel";
import { messageSchema } from "../schemas/messageSchema";
import Conversation from "../models/conversationModel";
import mongoose from "mongoose";
import { userSchema } from "../schemas/userSchema";
import UserModel from "../models/userModel";
import { Server } from "socket.io";

export const fetchUsers = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.find({});
    if (!user) {
      return res.status(500).json({
        message: "No users",
      });
    }
    return res.status(200).json({
      totalUsers: user,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const fetchMessages = async (req: Request, res: Response) => {
  const { receiverId, senderId } = req.params;

  console.log("ReceiverId:", receiverId);
  console.log("SenderId:", senderId);

  try {
    // Query messages where either the senderId or receiverId matches
    const messages = await Message.find({
      $or: [
        { senderId: senderId, recieverId: receiverId },
        { senderId: receiverId, recieverId: senderId },
      ],
    });

    // If no messages are found, return 404
    if (!messages || messages.length === 0) {
      return res.status(404).json({
        message: "No messages found",
      });
    }

    // If messages are found, return them
    return res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

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
        //this is backend write socket for this according to the frontend
      });
    }
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, recieverId],
      },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }
    const newMessage = await Message.create({
      senderId: senderId,
      recieverId: recieverId,
      message: message.data.message,
    });
    if (!newMessage) {
      return res.status(500).json({
        message: "Something went wrong while creating message",
      });
    }
    if (newMessage) {
      conversation.messages.push(
        newMessage._id as mongoose.Schema.Types.ObjectId
      );
    }
    await Promise.all([conversation.save(), newMessage.save()]);
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

export const fetchConversation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const conversation = await Conversation.findOne({ participants: id });
    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }
    return res.status(200).json({
      conversation,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const extractMessages = async (req: Request, res: Response) => {
  const { messageId } = req.params;

  try {
    console.log("Received messageId:", messageId); // Log the messageId

    // Query by `_id` or custom `messageId`
    const message = await Message.findOne({ _id: messageId }); // Adjust field if using a custom field

    // console.log("Message result:", message); // Log the message result

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    return res.status(200).json({
      message,
    });
  } catch (e) {
    console.error("Error fetching message:", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
