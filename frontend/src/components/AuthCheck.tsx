"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import { redirect, usePathname } from "next/navigation";
import { Path } from "@/helper/Path";

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const [user] = useContext(UserContext);
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return loading;
  }
  return user
    ? props.children
    : props.fallback || redirect(`${Path.LogIn}?from=${pathname}`);
}
