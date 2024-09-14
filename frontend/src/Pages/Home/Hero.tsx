import { ShineBorderDemo } from "@/components/Shineborder";
import { Button } from "@/components/ui/button";
import ShineBorder from "@/components/ui/shineborder";
import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="h-full w-full flex flex-col gap-5">
      {/* Top section with background image */}
      {/* <div
        className="h-[30rem] w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1725610588095-f117c0e2a921?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div> */}

        <div>
            <ShineBorderDemo/>
        </div>

      {/* Bottom content section */}
      <div className="h-auto w-full flex flex-col gap-6">
        <div>
          <h1 className="font-bold text-5xl">Level Up Your Tech Skills</h1>
        </div>
        <div>
          <h4 className="text-2xl">
            Master cutting-edge computer science courses and unlock your
            potential in the digital world.
          </h4>
        </div>
        <div>
          <Button>Explore Courses</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
