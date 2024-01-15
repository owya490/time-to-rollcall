"use client";
import Topbar from "./Topbar";
import { UserContext } from "@/lib/context";
import { useUserData } from "@/lib/hooks";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <Topbar />
      <div className="my-24">{children}</div>
      <Toaster />
    </UserContext.Provider>
  );
}
