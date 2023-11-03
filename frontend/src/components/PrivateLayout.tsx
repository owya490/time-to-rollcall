"use client";
import Navbar from "./Navbar";
import { UserContext } from "@/lib/context";
import { useUserAuth } from "@/lib/hooks";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUserAuth();
  return (
    <UserContext.Provider value={user}>
      <div className="min-h-screen">
        <div className="flex">
          <Navbar />
          <div className="pt-16 md:pt-0 flex flex-col flex-grow w-screen md:w-full min-h-screen">
            {children}
          </div>
          <Toaster />
        </div>
      </div>
    </UserContext.Provider>
  );
}
