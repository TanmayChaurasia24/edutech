"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Navigate } from "react-router-dom";

export function SigninFormDemo() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("Form submitted", username, password);
      alert("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Edutech
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign in to Edutech
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            id="username"
            placeholder="yourusername"
            type="text"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            placeholder="••••••••"
            type="password"
          />
        </LabelInputContainer>
        <div className="mb-4">
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Don't have an account?{" "}
            <a className="text-white font-semibold underline" href="/signup">
              Sign up
            </a>
          </span>
        </div>
        <button
          className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          type="submit"
          disabled={loading}
        >
          Sign in &rarr;
          <BottomGradient />
        </button>
      </form>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <div className="flex flex-col space-y-4">
        <OAuthButton provider="GitHub" Icon={IconBrandGithub} />
        <OAuthButton provider="Google" Icon={IconBrandGoogle} />
        <OAuthButton provider="OnlyFans" Icon={IconBrandOnlyfans} />
      </div>
    </div>
  );
}

const OAuthButton = ({ provider, Icon }: { provider: string; Icon: React.ElementType }) => (
  <button
    className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
    type="button"
    onClick={() => console.log(`Sign in with ${provider}`)}
  >
    <Icon className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
      {provider}
    </span>
    <BottomGradient />
  </button>
);

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
