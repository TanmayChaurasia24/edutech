// src/lib/AuthContext.tsx

import React, { createContext, useState, useContext, useEffect } from "react";

// Define the shape of your context
interface AuthContextProps {
  user: {
    userId: string | null;
    token: string | null;
    isAuthenticated: boolean;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      userId: string | null;
      token: string | null;
      isAuthenticated: boolean;
    }>
  >;
  logout: () => void;
}

// Create the context with undefined as the initial value
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({
    userId: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
  });

  // Logout function to clear the auth state and localStorage
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUser({ userId: "", token: "", isAuthenticated: false }); 
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
