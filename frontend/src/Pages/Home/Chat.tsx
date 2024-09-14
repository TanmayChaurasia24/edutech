import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import React from "react";
import ProfilePic from "./ProfilePic";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { PlaceholdersAndVanishInputDemo } from "./Input";

const Chat = () => {
  return (
    <div className="flex items-center justify-center h-full w-full"> {/* Add `relative` to parent container */} 
      <Sheet> {/* Add `absolute` positioning */}
        <SheetTrigger className="justify-between w-52 border-2 border-white p-2 rounded-lg">
          Click here to Chat
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <div className="flex flex-row">
              <PlaceholdersAndVanishInputDemo />
            </div>
            <div className="flex flex-col justify-between">
              {/* Chat content here */}
              {Array(5).fill("").map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-row items-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded p-2"
                >
                  <ProfilePic />
                  <div className="ml-2">
                    <SheetTitle>Anurag negi</SheetTitle>
                    <SheetDescription>
                      Anurag negi is a remote software....{" "}
                      <span className="text-indigo-500 font-bold">(19:28)</span>
                    </SheetDescription>
                  </div>
                </div>
              ))}
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Chat;
