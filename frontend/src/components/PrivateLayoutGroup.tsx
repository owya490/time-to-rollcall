"use client";
import { GroupContext, MembersContext, UserContext } from "@/lib/context";
import { useGroupData, useMembersData } from "@/lib/hooks";
import { GroupId } from "@/models/Group";
import React, { useContext, useState } from "react";
import Topbar from "./Topbar";
import { updateGroup } from "@/lib/groups";
import EditGroup from "./group/EditGroup";

export default function PrivateLayoutGroup({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: GroupId };
}) {
  const [user] = useContext(UserContext);

  const groupData = useGroupData(user, params.groupId);
  const membersData = useMembersData(user, params.groupId);

  const [isOpen, setIsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  async function editGroup() {
    setUpdating(true);
    if (groupData[0]) {
      await updateGroup(groupData[0]);
    }
    setUpdating(false);
    closeModal();
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <GroupContext.Provider value={groupData}>
      <MembersContext.Provider value={membersData}>
        {groupData[0] && (
          <EditGroup
            isOpen={isOpen}
            closeModal={closeModal}
            group={groupData[0]}
            setGroup={groupData[1]}
            submit={editGroup}
            updating={updating}
          />
        )}
        <Topbar openModal={openModal} />
        <div>{children}</div>
      </MembersContext.Provider>
    </GroupContext.Provider>
  );
}
