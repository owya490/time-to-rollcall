"use client";
import {
  GroupContext,
  MembersContext,
  TagsContext,
  UserContext,
} from "@/lib/context";
import { useGroupData, useMembersData, useTagsData } from "@/lib/hooks";
import { GroupId, GroupModel } from "@/models/Group";
import React, { useContext, useEffect, useState } from "react";
import Topbar from "./Topbar";
import { updateGroup } from "@/lib/groups";
import EditGroup from "./group/EditGroup";
import { TagModel } from "@/models/Tag";
import Loader from "./Loader";

export default function PrivateLayoutGroup({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: GroupId };
}) {
  const [submitGroupForm, setSubmitGroupForm] = useState<
    GroupModel | null | undefined
  >(null);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const user = useContext(UserContext);
  const group = useGroupData(user, params.groupId);
  const members = useMembersData(user, group?.id);
  const tags = useTagsData(user, group?.id);
  const [submitTagsForm, setSubmitTagsForm] = useState<TagModel[] | null>(null);

  async function editGroup() {
    setUpdating(true);
    if (submitGroupForm && submitTagsForm) {
      await updateGroup(submitGroupForm, submitTagsForm);
    }
    setUpdating(false);
    closeModal();
  }

  function closeModal() {
    setIsOpen(false);
    if (group) setSubmitGroupForm(group);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (group !== null) {
      setSubmitGroupForm(group);
      setSubmitTagsForm(tags);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [group, tags]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader show />
      </div>
    );
  }

  return (
    <GroupContext.Provider value={group}>
      <MembersContext.Provider value={members}>
        <TagsContext.Provider value={tags}>
          {submitGroupForm && submitTagsForm !== null && (
            <EditGroup
              isOpen={isOpen}
              closeModal={closeModal}
              group={submitGroupForm}
              setGroup={setSubmitGroupForm}
              tags={submitTagsForm}
              setTags={setSubmitTagsForm}
              submit={editGroup}
              updating={updating}
            />
          )}
          <Topbar openModal={openModal} />
          {children}
        </TagsContext.Provider>
      </MembersContext.Provider>
    </GroupContext.Provider>
  );
}
