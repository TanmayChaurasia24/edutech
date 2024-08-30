// import React from "react";
import { BackgroundBeamsWithCollision } from "../../components/ui/background-beams-with-collision";
import { HeaderNav, NavbarDemo } from "./NavbarDemo";
import { ModeToggle } from "@/components/mode-toggle";
import { LayoutGridDemo } from "./Layout";
import { TextGenerateEffectDemo } from "./TextArea";
import { Sheet } from "@/components/ui/sheet";
import Chat from "./Chat";
import { BackgroundBeamsDemo } from "./BackgroundBeamsDemo";
// import App from "../../App"

const Home = () => {
  return (
    <div>
      <BackgroundBeamsDemo/>
      <TextGenerateEffectDemo/>
      <Chat/>
      <LayoutGridDemo/>
    </div>
  );
};

export default Home;
