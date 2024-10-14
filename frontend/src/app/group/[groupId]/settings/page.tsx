"use client";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import AuthCheck from "@/components/AuthCheck";

export default function GroupSettings() {
  const [user] = useContext(UserContext);

  // get settings in useEffect
  return (
    <AuthCheck>
      <p>This is the settings creation page {user?.displayName}</p>
      <p>Change settings</p>
      <p>TODO: change group name</p>
      <p>TODO: change tag names</p>
      <p>TODO: remove tags</p>
    </AuthCheck>
  );
}
