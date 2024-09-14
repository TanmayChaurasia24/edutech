import { Avatar } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import { AvatarDemo } from "./avatar";
import { BookOpen, GraduationCap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {};

const Profile = (props: Props) => {
  const [length,setLength]=useState(0);
  const enrolledCourses=async()=>{
    const response = await fetch(`/api/course/enrolledCourses/${localStorage.getItem('userId')}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    const ans=await response.json();
    setLength(ans.courses.length);
  }

  useEffect(()=>{
    enrolledCourses();
  },[])

  const [data, setData] = useState<any>([]);
  const getProfileData = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(`/api/user/currentuser/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const ans = await response.json();
    setData(ans.user);
    console.log(ans);
    console.log(ans.user.name);
    console.log(ans.user.name);
  };

  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div className="h-screen w-full">
      <div className="flex flex-col h-full w-full p-10 gap-6">
        <div className="h-1/2 flex justify-between border">
          <div className="flex flex-row p-4 w-40 gap-2">
            <AvatarDemo />
            <div className="m-3">
              <h1 className="text-xl font-bold">{data.username}</h1>
              <h4>{data.email}</h4>
            </div>
          </div>
          <div className="p-6">
            <Button variant="outline" className="ml-auto">
              <Settings className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>
        <div className="h-1/2 flex flex-row justify-center items-center">
          <div className=" h-full w-full flex gap-4">
            <div className="border h-2/3 w-1/5 p-6 flex flex-col gap-4">
              <div className=" flex justify-between">
                <h1>Enrolled Courses</h1>
                <BookOpen className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{length}</h1>
              </div>
            </div>
            <div className="border h-2/3 w-1/5 p-6 flex flex-col gap-4">
              <div className=" flex justify-between">
                <h1>Completed Courses</h1>
                <GraduationCap className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">5</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4 h-full w-full">
          <div className="h-1/4gap-2">
            <h1 className="text-2xl font-bold">Enrolled Courses</h1>
            <h2>Your learning journey</h2>
          </div>
          <div className="h-3/4 flex p-4 flex-col gap-4">
            <div className="flex flex-row border">
              <div className="h-auto w-[50vw]">
                <h1>Introduction to React</h1>
                <h4>Progress: 100%</h4>
              </div>
              <div className="h-auto w-[50vw]">
                <h1>Bar</h1>
              </div>
            </div>
            <div className="flex flex-row border">
              <div className="h-auto w-[50vw]">
                <h1>Introduction to React</h1>
                <h4>Progress: 100%</h4>
              </div>
              <div className="h-auto w-[50vw]">
                <h1>Bar</h1>
              </div>
            </div>
            <div className="flex flex-row border">
              <div className="h-auto w-[50vw]">
                <h1>Introduction to React</h1>
                <h4>Progress: 100%</h4>
              </div>
              <div className="h-auto w-[50vw]">
                <h1>Bar</h1>
              </div>
            </div>
            <div className="flex flex-row border">
              <div className="h-auto w-[50vw]">
                <h1>Introduction to React</h1>
                <h4>Progress: 100%</h4>
              </div>
              <div className="h-auto w-[50vw]">
                <h1>Bar</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
