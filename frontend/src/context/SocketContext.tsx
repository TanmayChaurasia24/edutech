import React from "react";
import { createContext,useContext,useEffect,useState } from "react";


import {io, Socket} from "socket.io-client";

const SocketContext=createContext<Socket|null>(null);

const SOCKET_URL='';

export const SocketProvider=({children}:{children:React.ReactNode})=>{
  const [socket,setSocket]=useState<Socket|null>(null);
  useEffect(()=>{
    const newSocket=io(SOCKET_URL,{
      transports:["websocket"],
      query:{userId:"user123"},
    });
    setSocket(newSocket);

    return ()=>{
      newSocket.disconnect();
    }

  },[]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket=()=>{
  return useContext(SocketContext); 
}