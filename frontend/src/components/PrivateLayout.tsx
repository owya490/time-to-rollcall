"use client";
import { UserContext } from "@/lib/context";
import { useUserData } from "@/lib/hooks";
import React from "react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUserData();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
