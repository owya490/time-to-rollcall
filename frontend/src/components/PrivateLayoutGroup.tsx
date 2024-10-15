"use client";
import { GroupContext, MembersContext, UserContext } from "@/lib/context";
import { useGroupData } from "@/lib/hooks";
import { GroupId } from "@/models/Group";
import React, { useContext, useEffect, useState } from "react";
import Topbar from "./Topbar";
import { updateGroup } from "@/lib/groups";
import EditGroup from "./group/EditGroup";
import { MemberModel } from "@/models/Member";
import { getMembers } from "@/lib/members";

export default function PrivateLayoutGroup({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: GroupId };
}) {
  const [user] = useContext(UserContext);
  const [members, setMembers] = useState<MemberModel[]>([]);

  const groupData = useGroupData(user, params.groupId);

  useEffect(() => {
    if (groupData[0]) {
      getMembers(groupData[0].id).then((members) => setMembers(members));
    }
  }, [user, groupData[0]]);

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
      <MembersContext.Provider value={[members, setMembers]}>
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
        {groupData[0] && <Topbar openModal={openModal} />}
        {children}
      </MembersContext.Provider>
    </GroupContext.Provider>
  );
}
