"use client";
import { GroupPath, Path } from "@/helper/Path";
import {
  EventContext,
  GroupContext,
  TagsContext,
  UserContext,
} from "@/lib/context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  UserGroupIcon,
  Cog6ToothIcon,
  PencilIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  UserGroupIcon as UserGroupIconSolid,
  PencilIcon as PencilIconSolid,
} from "@heroicons/react/24/solid";
import GroupBadge from "./event/GroupBadge";
import { getUniversityKey, University } from "@/models/University";
import { logOut } from "@/lib/auth";
import EditEvent from "./event/EditEvent";
import { InitEvent } from "@/models/Event";
import { updateEvent, deleteEvent } from "@/lib/events";
import { GroupModel } from "@/models/Group";
import { TagModel } from "@/models/Tag";
import { updateGroup } from "@/lib/groups";
import EditGroup from "./group/EditGroup";

export default function Topbar({
  toggleEdit,
  setToggleEdit,
}: {
  toggleEdit?: boolean;
  setToggleEdit?: (toggleEdit: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useContext(UserContext);
  const group = useContext(GroupContext);
  const tags = useContext(TagsContext);
  const event = useContext(EventContext);
  const [submitEventForm, setSubmitEventForm] = useState(InitEvent);
  const [updating, setUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  async function editEvent() {
    setUpdating(true);
    if (group && event) {
      await updateEvent(group.id, submitEventForm);
    }
    setUpdating(false);
    closeModal();
  }

  function closeModal() {
    setIsOpen(false);
    if (event) setSubmitEventForm(event);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function deleteEventIn() {
    setUpdatingDelete(true);
    if (group && event) {
      await deleteEvent(group.id, event.id);
      router.push(Path.Group + "/" + group.id);
    }
    closeModal();
  }

  const [updatingDelete, setUpdatingDelete] = useState(false);
  const [deleteConfirmationIsOpen, setDeleteConfirmationIsOpen] =
    useState(false);
  const [submitGroupForm, setSubmitGroupForm] = useState<
    GroupModel | null | undefined
  >(null);

  const [isOpenGroup, setIsOpenGroup] = useState(false);
  const [updatingGroup, setUpdatingGroup] = useState(false);

  function closeDeleteConfirmationModal() {
    setDeleteConfirmationIsOpen(false);
  }

  function openDeleteConfirmationModal() {
    setDeleteConfirmationIsOpen(true);
  }

  useEffect(() => {
    if (event) setSubmitEventForm(event);
    // eslint-disable-next-line
  }, [event]);
  const [submitTagsForm, setSubmitTagsForm] = useState<
    TagModel[] | null | undefined
  >(null);

  async function editGroup() {
    setUpdatingGroup(true);
    if (submitGroupForm && submitTagsForm) {
      await updateGroup(submitGroupForm, submitTagsForm);
    }
    setUpdatingGroup(false);
    closeGroupModal();
  }

  function closeGroupModal() {
    setIsOpenGroup(false);
    if (group) setSubmitGroupForm(group);
  }

  function openGroupModal() {
    setIsOpenGroup(true);
  }

  useEffect(() => {
    if (group !== null && tags !== null) {
      setSubmitGroupForm(group);
      setSubmitTagsForm(tags);
    }
    // eslint-disable-next-line
  }, [group, tags]);
  return (
    <nav className="bg-white flex items-center sticky justify-between px-6 py-6 w-full z-40 top-0 start-0">
      {event && group && tags !== null && (
        <EditEvent
          groupId={group.id}
          tags={tags}
          isOpen={isOpen}
          closeModal={closeModal}
          deleteConfirmationIsOpen={deleteConfirmationIsOpen}
          openDeleteConfirmationModal={openDeleteConfirmationModal}
          closeDeleteConfirmationModal={closeDeleteConfirmationModal}
          submitEventForm={submitEventForm}
          setSubmitEventForm={setSubmitEventForm}
          createEvent={editEvent}
          deleteEvent={deleteEventIn}
          updatingDelete={updatingDelete}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          updating={updating}
        />
      )}
      {submitGroupForm && submitTagsForm !== null && (
        <EditGroup
          isOpen={isOpenGroup}
          closeModal={closeGroupModal}
          group={submitGroupForm}
          setGroup={setSubmitGroupForm}
          tags={submitTagsForm}
          setTags={setSubmitTagsForm}
          submit={editGroup}
          updating={updatingGroup}
        />
      )}
      {group ? (
        getUniversityKey(group.name as University) ? (
          <Link
            href={
              pathname === Path.Group + "/" + group.id
                ? Path.Group
                : Path.Group + "/" + group.id
            }
          >
            <GroupBadge
              campus={group.name as University}
              className="px-4 text-base"
            />
          </Link>
        ) : (
          <Link
            href={
              pathname === Path.Group + "/" + group.id
                ? Path.Group
                : Path.Group + "/" + group.id
            }
            className="bg-gray-900 rounded-full py-1 px-4 text-white font-light text-center"
          >
            {group.name}
          </Link>
        )
      ) : user ? (
        <div>Hi {user.displayName}</div>
      ) : (
        <div />
      )}
      {event ? (
        <div className="flex items-center gap-4 justify-end">
          {setToggleEdit && (
            <>
              {toggleEdit ? (
                <PencilIconSolid
                  className="cursor-pointer w-7 h-7 text-gray-500"
                  onClick={() => setToggleEdit(!toggleEdit)}
                />
              ) : (
                <PencilIcon
                  className="cursor-pointer w-7 h-7 text-gray-500"
                  onClick={() => setToggleEdit(!toggleEdit)}
                />
              )}
            </>
          )}
          <Cog6ToothIcon
            className="cursor-pointer w-7 h-7 text-gray-500"
            onClick={openModal}
          />
        </div>
      ) : group ? (
        <div className="flex items-center justify-end gap-4">
          {pathname === Path.Group + "/" + group.id + GroupPath.Members ? (
            <UserGroupIconSolid className="cursor-pointer w-7 h-7 text-gray-500" />
          ) : (
            <UserGroupIcon
              className="cursor-pointer w-7 h-7 text-gray-500"
              onClick={() =>
                router.push(Path.Group + "/" + group.id + GroupPath.Members)
              }
            />
          )}
          <Cog6ToothIcon
            className="cursor-pointer w-7 h-7 text-gray-500"
            onClick={openGroupModal}
          />
        </div>
      ) : user && pathname === Path.Group ? (
        <div className="flex items-center justify-end gap-4">
          <ArrowLeftEndOnRectangleIcon
            className="cursor-pointer w-7 h-7 text-gray-500"
            onClick={logOut}
          />
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
}
