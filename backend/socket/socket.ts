import { Server } from "socket.io";
import http from "http";
import express from "express";

const app=express();
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

type UserSocketMap={
    [key:string]:string;
}


const userSocketmap: UserSocketMap = {};

export const getRecieverSocketId = (recieverId: any) : string | undefined=> {
  return userSocketmap[recieverId];
};

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  let userId = socket.handshake.query.userId;

    if(Array.isArray(userId)){
        userId=userId[0];
    }

  if (userId && userId !== "undefined") {
    userSocketmap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketmap));
  } else {
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


export {io,app,server}