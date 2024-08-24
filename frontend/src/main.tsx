import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './Pages/Signup/Signup.tsx';
import Signin from './Pages/Signin/Signin.tsx';
import Home from './Pages/Home/Home.tsx'; // Import your Home component

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App is the layout component
    children: [
      {
        path: '/', // Home route
        element: <Home />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'signin', // Correct the path here for Signin
        element: <Signin />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
