"use client";
import { GroupContext, MembersContext, UserContext } from "@/lib/context";
import { useGroupData, useMembersData } from "@/lib/hooks";
import { GroupId, GroupModel, InitGroup } from "@/models/Group";
import React, { useContext, useEffect, useState } from "react";
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
  const [user, setUser] = useContext(UserContext);

  const groupData = useGroupData(user, setUser, params.groupId);
  const membersData = useMembersData(user, groupData[0]);
  const [submitGroupForm, setSubmitGroupForm] = useState<GroupModel>(InitGroup);

  const [isOpen, setIsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  async function editGroup() {
    setUpdating(true);
    if (groupData[0]) {
      await updateGroup(submitGroupForm);
      groupData[1](submitGroupForm);
    }
    setUpdating(false);
    closeModal();
  }

  function closeModal() {
    setIsOpen(false);
    if (groupData[0]) setSubmitGroupForm(groupData[0]);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (groupData[0]) setSubmitGroupForm(groupData[0]);
    // eslint-disable-next-line
  }, [groupData[0]]);

  return (
    <GroupContext.Provider value={groupData}>
      <MembersContext.Provider value={membersData}>
        {groupData[0] && (
          <EditGroup
            isOpen={isOpen}
            closeModal={closeModal}
            group={submitGroupForm}
            setGroup={setSubmitGroupForm}
            submit={editGroup}
            updating={updating}
          />
        )}
        <Topbar openModal={openModal} />
        {children}
      </MembersContext.Provider>
    </GroupContext.Provider>
  );
}
