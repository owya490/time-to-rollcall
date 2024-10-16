"use client";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import SignInButton from "./SignInButton";
import Loader from "./Loader";

// Component's children only shown to logged-in users
export default function AuthCheck(props: { children: React.ReactNode }) {
  const user = useContext(UserContext);
  if (user === null) {
    return (
      <div className="flex justify-center items-center">
        <Loader show />
      </div>
    );
  }
  return user ? (
    props.children
  ) : (
    <div className="mt-80 flex flex-col justify-center gap-5 text-center items-center">
      <h1 className="text-xl mx-24 text-gray-600">
        Join using your SOW account
      </h1>
      <SignInButton />
      <p className="text-gray-400 text-xs mt-4">
        You will be re-directed to Microsoft Teams login.
      </p>
    </div>
  );
}
