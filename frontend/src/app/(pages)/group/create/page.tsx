"use client";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import AuthCheck from "@/components/AuthCheck";

export default function GroupCreate() {
  const user = useContext(UserContext);
  return (
    <AuthCheck>
      <p>This is the group creation page {user?.displayName}</p>
      <p>Create group</p>
      <p>Name: </p>
      <p>Photo: </p>
    </AuthCheck>
  );
}
