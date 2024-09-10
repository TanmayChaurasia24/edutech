import { Button } from "@/components/ui/button";
// import { WebDevHero } from '@/components/webdevHero'
import React from "react";
import { useNavigate } from "react-router-dom";


export default function Webdev() {
  const navigate=useNavigate();

const enrollNow=()=>{
  navigate("/enroll")
}

const enrollWebDev=async()=>{
  const userId=localStorage.getItem("userId");
    const request = await fetch(`/api/course/:courseId/:${userId}/add`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      },
      body:JSON.stringify({
        courseId:"5f8d9f6b0b1c7a5a7c1a",
        studentId:"5f8d9f6b0b1c7a5a7c1a"
      })
    });
    const response = await request.json();

}

  return (
    <div className="flex flex-col h-screen gap-40">
      <div className=" h-[80vh] flex flex-row">
        <div className="h-full w-1/2 flex flex-col justify-center m-4">
          <h1 className="font-semibold text-5xl w-full">
            Masterning AI Powered Web Development
          </h1>
          <h4 className="mt-3 ml-3">With EDUTECH.</h4>
          <div className="flex flex-row gap-4 m-4">
            <Button onClick={enrollWebDev}>Enroll now</Button>
            <Button>View Curriculum</Button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img
            height={800}
            width={600}
            src="https://codesrevolvewordpress.s3.us-west-2.amazonaws.com/revolveai/2023/07/14065519/benefits-of-website-development.jpg"
          ></img>
        </div>
      </div>
      <div className="h-[50vh]">
        <div className="w-full h-full flex flex-col justify-center gap-4 items-center">
          <div className="h-6 w-20 bg-slate-200 rounded-lg"></div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            What You'll Learn
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our AI-powered web development course covers a wide range of topics,
            from the fundamentals of web development to advanced techniques for
            leveraging AI in your projects.
          </p>
          <div className="flex flex-row w-[80%] justify-center gap-8">
            <div className="flex flex-col w-2/5 justify-start gap-8">
              <div>
                <h1 className="text-2xl font-semi-bold tracking-tighter">
                  Fundamental of Web Development
                </h1>

                <h4 className="font-light text-muted-foreground">
                  Learn the core concepts of HTML, CSS, and JavaScript to build
                  responsive and accessible web pages.
                </h4>
              </div>
              <div>
                <h1 className="text-2xl font-semi-bold tracking-tighter">
                  Integrating AI into Web Apps
                </h1>
                <h4 className="font-light text-muted-foreground">
                  Discover how to leverage AI-powered tools and APIs to enhance
                  your web applications with intelligent features.
                </h4>
              </div>
              <div>
                <h1 className="text-2xl font-semi-bold tracking-tighter">
                  Advanced Web Development Techniques
                </h1>
                <h4 className="font-light text-muted-foreground">
                  Explore modern web development frameworks, libraries, and best
                  practices to build scalable and maintainable web applications.
                </h4>
              </div>
            </div>
            <div className="flex justify-center bg-red-500 h-full w-1/3">
              <img
                height={100}
                width={400}
                src="https://miro.medium.com/v2/resize:fit:1400/1*xJdg7MNse8ty5LKU2f6pOg.png"
              ></img>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[50vh]">
        <div className="w-full h-full flex flex-col justify-center gap-4 items-center">
          <div className="h-6 w-20 bg-slate-200 rounded-lg"></div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Experienced Experts
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our team of instructors are seasoned web development professionals
            with a deep understanding of AI and its applications in the field.
          </p>
          <div className="flex flex-row w-[80%] justify-center gap-8">
            <div className="flex flex-col w-2/5 justify-center gap-8">
              <div>
                <h1 className="text-2xl font-semi-bold tracking-tighter">
                  John Doe
                </h1>

                <h4 className="font-light text-muted-foreground">
                  John is a seasoned web developer with over 10 years of
                  experience. He is passionate about leveraging AI to enhance
                  web development workflows and build intelligent applications.
                </h4>
              </div>
              <div>
                <h1 className="text-2xl font-semi-bold tracking-tighter">
                  Jane Ahn
                </h1>
                <h4 className="font-light text-muted-foreground">
                  Jane is an experienced web designer who specializes in using
                  AI-powered tools to create visually stunning and user-friendly
                  web experiences
                </h4>
              </div>
              <div>
                <h1 className="text-2xl font-semi-bold tracking-tighter">
                  Advanced Web Development Techniques
                </h1>
                <h4 className="font-light text-muted-foreground">
                  Explore modern web development frameworks, libraries, and best
                  practices to build scalable and maintainable web applications.
                </h4>
              </div>
            </div>
            <div className="flex justify-center bg-red-500 h-full w-1/3">
              <img height={100} width={400} src="https://5.imimg.com/data5/SELLER/Default/2021/3/JB/CY/CQ/83906125/website-developer.jpg"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
