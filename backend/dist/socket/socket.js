"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = exports.io = exports.getRecieverSocketId = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
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
const userSocketmap = {};
const getRecieverSocketId = (recieverId) => {
    return userSocketmap[recieverId];
};
exports.getRecieverSocketId = getRecieverSocketId;
io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    let userId = socket.handshake.query.userId;
    if (Array.isArray(userId)) {
        userId = userId[0];
    }
    if (userId && userId !== "undefined") {
        userSocketmap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketmap));
    }
    else {
        console.log("Invalid userId recieved", userId);
    }
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        if (userId && userSocketmap[userId]) {
            delete userSocketmap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketmap));
        }
    });
});
