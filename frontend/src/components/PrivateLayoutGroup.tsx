"use client";
import { GroupContext } from "@/lib/context";
import { useGroupData } from "@/lib/hooks";
import React from "react";

export default function PrivateLayoutGroup({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: string };
}) {
  const groupData = useGroupData(params.groupId);
  return (
    <GroupContext.Provider value={groupData}>{children}</GroupContext.Provider>
  );
}
