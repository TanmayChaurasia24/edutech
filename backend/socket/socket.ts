import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/messageModel";
import Conversation from "../models/conversationModel";
import mongoose from "mongoose";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New websocket connection: ", socket.id);

  socket.on("join_room", (userId) => {
    socket.join(userId);
    console.log("User joined room:", userId);
  });

  socket.on("send_message", async (messageData) => {
    try {
      const { senderId, receiverId, message } = messageData;
      console.log("Message data:", messageData);
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }

      const newMessage = await Message.create({
        senderId: senderId,
        recieverId: receiverId,
        message: message,
      });

      if (!newMessage) {
        console.log("Message not sent");
        return;
      }

      conversation.messages.push(
        newMessage._id as mongoose.Schema.Types.ObjectId
      );
      await conversation.save(); 

      console.log("Message sent:", newMessage);

      
      io.to(receiverId).emit("receive_message", newMessage); 
      io.to(senderId).emit("message_sent", newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("fetch_messages", async ({ senderId, receiverId }) => {
    try {
      console.log("Fetching messages:", senderId, receiverId);

      
      const messages = await Message.find({
        $or: [
          { senderId: senderId, recieverId: receiverId }, 
          { senderId: receiverId, recieverId: senderId }, 
        ],
      });

      console.log("Fetched messages:", messages);
      socket.emit("messages", messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

export { io, app, server };
