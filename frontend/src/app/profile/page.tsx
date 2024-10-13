"use client";
import AuthCheck from "@/components/AuthCheck";
import Topbar from "@/components/Topbar";
import { UserContext } from "@/lib/context";
import { useContext } from "react";

export default function Profile() {
  const [user] = useContext(UserContext);
  return (
    <AuthCheck>
      <Topbar />
      <h1 className="text-2xl text-gray-500">
        Edit your profile {user?.displayName}
      </h1>
    </AuthCheck>
  );
}
