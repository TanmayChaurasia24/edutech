import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function AvatarDemo() {
    return (
      <Avatar className="h-[70px] w-[70px]">
        <AvatarImage src="https://avatars.githubusercontent.com/u/115611556?v=4" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  }
  