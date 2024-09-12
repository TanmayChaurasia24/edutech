import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Pages/Signup/Signup.tsx";
import Signin from "./Pages/Signin/Signin.tsx";
import Home from "./Pages/Home/Home.tsx";
import Webdev from "./Pages/Web-dev/Web-dev.tsx";
import EnrolledCourses from "./Pages/EnrolledCourses/EnrolledCourses.tsx";
import AvailableCourses from "./Pages/AvailableCourses/AvailableCourses.js";
import DataStrutureandAlgorithm from "./Pages/Data-Structure-and-Algorithm/Data-Struture-and-Algorithm.tsx";
import { AuthProvider } from "./lib/AuthContext"; // Import AuthProvider
import Profile from "./Pages/Profile/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App is the layout component
    children: [
      {
        path: "/",
        element: <Home />, // Home route
      },
      {
        path: "signup",
        element: <Signup />, // Signup route
      },
      {
        path: "signin",
        element: <Signin />, // Signin route
      },
      {
        path: "/enrolled-courses/Web-development",
        element: <Webdev />,
      },
      {
        path: "/enrolled-courses",
        element: <EnrolledCourses />,
      },
      {
        path: "/available-courses",
        element: <AvailableCourses />,
      },
      {
        path: "/enrolled-courses/Data-structure-and-algorithm",
        element: <DataStrutureandAlgorithm />,
      },
      {
        path: "/profile",
        element: <Profile/>,
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider> {/* Wrap the entire application with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
