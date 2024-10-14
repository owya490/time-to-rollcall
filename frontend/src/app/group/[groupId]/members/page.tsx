"use client";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import AuthCheck from "@/components/AuthCheck";

export default function GroupMember() {
  const [user] = useContext(UserContext);
  return (
    <AuthCheck>
      <p>This is the group member page {user?.displayName}</p>
      <p>TODO: Create New Member</p>
      <p>TODO: Edit Members</p>
    </AuthCheck>
  );
}
