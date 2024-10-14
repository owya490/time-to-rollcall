"use client";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import SignInButton from "./SignInButton";

// Component's children only shown to logged-in users
export default function AuthCheck(props: { children: React.ReactNode }) {
  const [user] = useContext(UserContext);
  return user ? (
    props.children
  ) : (
    <h2 className="m-6">
      Sign in: <SignInButton />
    </h2>
  );
}
