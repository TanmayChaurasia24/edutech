import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './Pages/Signup/Signup.tsx';
import Signin from './Pages/Signin/Signin.tsx';
import Home from './Pages/Home/Home.tsx'; // Import the Home component

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App is the layout component
    children: [
      {
        path: '/',
        element: <Home /> // Home route
      },
      {
        path: 'signup',
        element: <Signup /> // Signup route
      },
      {
        path: 'signin',
        element: <Signin /> // Signin route
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
