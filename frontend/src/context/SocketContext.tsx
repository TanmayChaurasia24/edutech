import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Define an interface for the context value
interface SocketContextValue {
  socket: Socket | null;
  isConnected: boolean;
}

// Create the context with the correct type
const SocketContext = createContext<SocketContextValue | null>(null);

const SOCKET_URL = "http://localhost:8000";

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      query: {
        token: localStorage.getItem("token"),
      },
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to the socket");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from the socket");
    });



    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket:socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket context
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
