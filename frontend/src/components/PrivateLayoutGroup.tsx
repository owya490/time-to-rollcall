"use client";
import { GroupContext, MembersContext, UserContext } from "@/lib/context";
import { useGroupData, useMembersData } from "@/lib/hooks";
import { GroupId } from "@/models/Group";
import React, { useContext } from "react";
import Topbar from "./Topbar";

export default function PrivateLayoutGroup({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: GroupId; page: string };
}) {
  const [user] = useContext(UserContext);
  const groupData = useGroupData(user, params.groupId);
  const membersData = useMembersData(user, params.groupId);
  return (
    <GroupContext.Provider value={groupData}>
      <MembersContext.Provider value={membersData}>
        <Topbar />
        <div>{children}</div>
      </MembersContext.Provider>
    </GroupContext.Provider>
  );
}
