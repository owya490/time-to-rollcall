"use client";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import SignInButton from "./SignInButton";
import SignInButtonGoogle from "./SignInButtonGoogle";
import Loader from "./Loader";

// Component's children only shown to logged-in users
export default function AuthCheck(props: { children: React.ReactNode }) {
  const [user] = useContext(UserContext);
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
    <div>
      <div className="flex justify-center w-full my-6">
        <SignInButton />
      </div>
      <div className="flex justify-center w-full my-12">
        <SignInButtonGoogle />
      </div>
    </div>
  );
}
