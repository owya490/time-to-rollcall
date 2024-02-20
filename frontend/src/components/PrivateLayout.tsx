"use client";
import { UserContext } from "@/lib/context";
import { useUserData } from "@/lib/hooks";
import React from "react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}
