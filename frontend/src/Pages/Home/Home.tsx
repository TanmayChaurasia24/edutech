// import React from "react";
import { BackgroundBeamsWithCollision } from "../../components/ui/background-beams-with-collision";
import { HeaderNav, NavbarDemo } from "./NavbarDemo";
import { ModeToggle } from "@/components/mode-toggle";
import { LayoutGridDemo } from "./Layout";
import { TextGenerateEffectDemo } from "./TextArea";
import { Sheet } from "@/components/ui/sheet";
import Chat from "./Chat";
// import { BackgroundBeamsDemo } from "./BackgroundBeamsDemo";
import Hero from "./Hero";
import Feature from "./Feature";
import Whyus from "./Whyus";
import Testimonials from "./Testimonials";
import { ShimmerButtonDemo } from "@/components/Shimmerbutton";
// import App from "../../App"

const Home = () => {
  return (
    <div className="flex flex-col h-auto gap-20 p-5">
      <Hero/>
      <Feature/>
      <Testimonials/>
      <Whyus/>
      <Chat/>
      {/* <Chat/> */}
    </div>
  );
};

export default Home;
