import React from "react";
import { Outlet } from "react-router-dom";
import { NavbarDemo } from "./Pages/Home/NavbarDemo";
import { ThemeProvider } from "./components/theme-provider"; // Adjust the path as needed

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Outlet />
       {/* This is where the other route components will be rendered */}
    </ThemeProvider>
  );
}

export default App;
