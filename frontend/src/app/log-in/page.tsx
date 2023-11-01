"use client";
import { useContext } from "react";
import { UserContext } from "../../lib/context";
import SignInButton from "../../components/SignInButton";

export default function LogIn() {
  const user = useContext(UserContext);
  return <main>{!user ? <SignInButton /> : null}</main>;
}
