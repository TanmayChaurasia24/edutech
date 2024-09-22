import React, { useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShimmerButtonDemo } from "@/components/Shimmerbutton";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useSocket } from "@/context/SocketContext";
import { useAuth } from "@/lib/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProfilePic from "./ProfilePic";
import { PlaceholdersAndVanishInputDemo } from "./Input";

const Chat = () => {
  const { socket } = useSocket();
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatMessage, setChatMessage] = useState<string>("");
  const [receiverId, setReceiverId] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<string>("");

  // Create the ref for the scroll container
  const containerRef = useRef<any>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/user/fetchmessages`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAllUsers(data.totalUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSendMessage = async () => {
    if (socket) {
      const newMessage = {
        senderId: user.userId,
        receiverId: receiverId,
        message: chatMessage,
      };
      socket.emit("send_message", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setChatMessage("");
    }
  };

  useEffect(() => {
    if (socket && user.userId && receiverId) {
      socket.emit("fetch_messages", {
        senderId: user.userId,
        receiverId: receiverId,
      });

      socket.emit("join_room", user.userId);

      socket.on("receive_message", (message) => {
        console.log("In receive message socket",message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("messages", (messages) => {
        console.log("In messages socket",messages);
        setMessages(messages);
      });

      return () => {
        socket.off("messages");
      };
    }
  }, [socket, user.userId, receiverId]);

  const currentUserfun = async (userId: string) => {
    const response = await fetch(`/api/user/currentuser/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setCurrentUser(data.user.username);
  };

  const handleUserClick = (userId: string) => {
    setSelectedUser(userId);
    setReceiverId(userId);
    currentUserfun(userId);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  // Set up the scroll handler inside useEffect
  useEffect(() => {
    fetchData();
  }, []);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom every time messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages,selectedUser]);

  return (
    <div className="flex items-center justify-center h-full mx-auto relative">
      <Sheet>
        <SheetTrigger>
          <ShimmerButtonDemo />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            {!selectedUser ? (
              <div>
                <div className="flex flex-row">
                  <PlaceholdersAndVanishInputDemo />
                </div>
                <div className="flex flex-col justify-between">
                  {allUsers.map((user: any) => (
                    <div
                      key={user._id}
                      onClick={() => handleUserClick(user._id)}
                      className="flex flex-row items-center hover:bg-slate-100 dark:hover:bg-slate-800 hover:cursor-pointer rounded p-2"
                    >
                      <ProfilePic />
                      <div className="ml-2">
                        <SheetTitle>{user.username}</SheetTitle>
                        <SheetDescription>
                          Anurag Negi is a remote software developer....{" "}
                          <span className="text-indigo-500 font-bold">
                            (19:28)
                          </span>
                        </SheetDescription>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-[100rem] gap-2">
                <div className="h-[48rem] w-auto mt-2 border">
                  <div className="navbar flex flex-row items-center justify-between border border-bottom-0 border-slate-200 dark:border-slate-800 p-4">
                    <div className="flex flex-row items-center gap-2">
                      <img
                        className="rounded-full"
                        height={50}
                        width={50}
                        src="https://avatars.githubusercontent.com/u/115611556?v=4"
                        alt=""
                      />
                      <h1 className="text-lg font-semi-bold">{currentUser}</h1>
                    </div>
                    <Button className="h-10 w-16" onClick={handleBackClick}>
                      Back
                    </Button>
                  </div>

                  <ScrollArea className="flex h-[43rem] w-[21rem] rounded-md border p-4 overflow-y-auto">
                    <div className="flex flex-col gap-4" >
                      {messages.map((message: any, index: number) => (
                        <div
                        ref={chatEndRef}
                          key={index}
                          className={`flex flex-col gap-2 w-[10rem] p-3 border rounded-lg ${
                            message.senderId === user.userId
                              ? "bg-indigo-400 self-end"
                              : "self-start"
                          }`}
                        >
                          <h1>{message.message}</h1>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <div className="flex flex-row items-center justify-center border">
                  <input
                    className="w-[20rem] h-[3rem] bg-transparent flex justify-center items-center p-4"
                    placeholder="Send message"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                        e.preventDefault();
                      }
                    }}
                  />
                  <Send
                    onClick={() => handleSendMessage()}
                    className="mr-2 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Chat;
