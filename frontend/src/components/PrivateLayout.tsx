"use client";
import { UserContext } from "@/lib/context";
import { useUserData } from "@/lib/hooks";
import React from "react";
import Topbar from "./Topbar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <Topbar />
      {children}
    </UserContext.Provider>
  );
}
