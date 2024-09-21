"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = exports.io = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const messageModel_1 = __importDefault(require("../models/messageModel"));
const conversationModel_1 = __importDefault(require("../models/conversationModel"));
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
exports.io = io;
io.on("connection", (socket) => {
    console.log("New websocket connection: ", socket.id);
    socket.on("join_room", (userId) => {
        socket.join(userId);
        console.log("User joined room:", userId);
    });
    socket.on("send_message", (messageData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { senderId, receiverId, message } = messageData;
            console.log("Message data:", messageData);
            let conversation = yield conversationModel_1.default.findOne({
                participants: { $all: [senderId, receiverId] },
            });
            if (!conversation) {
                conversation = yield conversationModel_1.default.create({
                    participants: [senderId, receiverId],
                });
            }
            const newMessage = yield messageModel_1.default.create({
                senderId: senderId,
                recieverId: receiverId,
                message: message,
            });
            if (!newMessage) {
                console.log("Message not sent");
                return;
            }
            conversation.messages.push(newMessage._id);
            yield conversation.save();
            console.log("Message sent:", newMessage);
            io.to(receiverId).emit("receive_message", newMessage);
            io.to(senderId).emit("message_sent", newMessage);
        }
        catch (error) {
            console.error("Error sending message:", error);
        }
    }));
    socket.on("fetch_messages", (_a) => __awaiter(void 0, [_a], void 0, function* ({ senderId, receiverId }) {
        try {
            console.log("Fetching messages:", senderId, receiverId);
            const messages = yield messageModel_1.default.find({
                $or: [
                    { senderId: senderId, recieverId: receiverId },
                    { senderId: receiverId, recieverId: senderId },
                ],
            });
            console.log("Fetched messages:", messages);
            socket.emit("messages", messages);
        }
        catch (error) {
            console.error("Error fetching messages:", error);
        }
    }));
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
