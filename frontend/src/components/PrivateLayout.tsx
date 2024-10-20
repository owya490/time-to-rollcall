"use client";
import { UserContext } from "@/lib/context";
import { useUserListener } from "@/lib/hooks";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUserListener();
  return (
    <UserContext.Provider value={user}>
      <Toaster />
      <div className="mt-16">{children}</div>
    </UserContext.Provider>
  );
}
