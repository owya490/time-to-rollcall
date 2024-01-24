"use client";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { redirect, usePathname } from "next/navigation";
import { Path } from "@/helper/Path";

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const user = useContext(UserContext);
  const pathname = usePathname();

  return user
    ? props.children
    : props.fallback || redirect(`${Path.LogIn}?from=${pathname}`);
}
