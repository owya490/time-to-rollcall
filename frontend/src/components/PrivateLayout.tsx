"use client";
import { UserContext } from "@/lib/context";
import { useUserListener } from "@/lib/hooks";
import React from "react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUserListener();
  return (
    <UserContext.Provider value={user}>
      <div className="mt-16">{children}</div>
    </UserContext.Provider>
  );
}
