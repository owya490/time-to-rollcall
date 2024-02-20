"use client";
import { GroupContext } from "@/lib/context";
import { useGroupData } from "@/lib/hooks";
import { GroupId } from "@/models/Group";
import React from "react";
import Topbar from "./Topbar";

export default function PrivateLayoutGroup({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: GroupId };
}) {
  const groupData = useGroupData(params.groupId);
  return (
    <GroupContext.Provider value={groupData}>
      <Topbar />
      <div>{children}</div>
    </GroupContext.Provider>
  );
}
