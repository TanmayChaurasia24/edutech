import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePic = () => {
  return (
    <div>
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/115611556?v=4" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ProfilePic;
