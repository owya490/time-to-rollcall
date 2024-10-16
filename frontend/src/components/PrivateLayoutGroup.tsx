"use client";
import {
  GroupContext,
  MembersContext,
  TagsContext,
  UserContext,
} from "@/lib/context";
import { useGroupData, useMembersData, useTagsData } from "@/lib/hooks";
import { GroupId } from "@/models/Group";
import React, { useContext } from "react";

export default function PrivateLayoutGroup({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: GroupId };
}) {
  const user = useContext(UserContext);
  const group = useGroupData(user, params.groupId);
  const members = useMembersData(user, group?.id);
  const tags = useTagsData(user, group?.id);
  return (
    <GroupContext.Provider value={group}>
      <MembersContext.Provider value={members}>
        <TagsContext.Provider value={tags}>{children}</TagsContext.Provider>
      </MembersContext.Provider>
    </GroupContext.Provider>
  );
}
