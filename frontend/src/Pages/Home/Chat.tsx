import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom"; // Add this to navigate on click
import ProfilePic from "./ProfilePic";
import { PlaceholdersAndVanishInputDemo } from "./Input";
import { ShimmerButtonDemo } from "@/components/Shimmerbutton";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const Chat = () => {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  // const [msg,setMsg]=useState<string>("");
  const [chatMessage, setChatMessage] = useState<string>("");
  const [receiverId, setReceiverId] = useState<string>("");
  const [currentUser,setCurrentUser]=useState<string>("");

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
      console.log(data);
      setAllUsers(data.totalUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSendMessage = async () => {
    const response = await fetch(`/api/message/sendmessage/${receiverId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        message: chatMessage,
      }),
    });
    const data = await response.json();
    console.log(data);

    setChatMessage("");
  };

  const fetchMessages = async (receiverId: string) => {
    try {
      const response = await fetch(
        `/api/message/fetchmessages/${localStorage.getItem(
          "userId"
        )}/${receiverId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      // Handle non-OK responses
      if (!response.ok) {
        if (response.status === 404) {
          console.log("No messages found.");
          setMessages([]); // Set empty messages array when 404
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Handle case when no messages exist (null, empty, etc.)
      if (!data || !data.messages || data.messages.length === 0) {
        setMessages([]); // Set to empty array when no messages found
        return;
      }

      // If messages are found, set them
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const currentUserfun=async(userId:string)=>{
    const response=await (fetch(`/api/user/currentuser/${userId}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
    }))
    const data=await response.json();
    console.log("Current User:",data.user.username);
    setCurrentUser(data.user.username);
  }

  const handleUserClick = (userId: string) => {
    setSelectedUser(userId);
    fetchMessages(userId);
    setReceiverId(userId);
    currentUserfun(userId);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                  {/* Chat content */}
                  {allUsers.map((user: any) => (
                    <div
                      key={user._id}
                      onClick={() => handleUserClick(user._id)} // Handle user click
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
              <div className="flex flex-col gap-2">
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
                  <div className="flex flex-col h-auto justify-end items-end gap-2 p-4">
                    {messages.map((message: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 p-3 border rounded-lg"
                      >
                        <h1>{message.message}</h1>
                      </div>
                    ))}
                  </div>
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
                        e.preventDefault(); // Prevent form submission or other default actions
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
