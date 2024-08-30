import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderNav, NavbarDemo } from './Pages/Home/NavbarDemo'; // Navbar component
import { ThemeProvider } from './components/theme-provider'; // Adjust the path as needed

function App() {
  return (
    <ThemeProvider>
      <HeaderNav/>
      <main>
        <Outlet /> {/* This is where the routed content will be rendered */}
      </main>
      {/* Optionally, add a Footer component here */}
      <h1>Footer</h1>
    </ThemeProvider>

  );
}

export default App;
