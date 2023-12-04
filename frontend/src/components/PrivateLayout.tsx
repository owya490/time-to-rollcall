"use client";
import Topbar from "./Topbar";
import { UserContext } from "@/lib/context";
import { useUserAuth } from "@/lib/hooks";
import React from "react";
import { Toaster } from "react-hot-toast";
import Botbar from "./Botbar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUserAuth();
  return (
    <UserContext.Provider value={user}>
      <Topbar />
      <div className="my-24">{children}</div>
      <Botbar />
      <Toaster />
    </UserContext.Provider>
  );
}
