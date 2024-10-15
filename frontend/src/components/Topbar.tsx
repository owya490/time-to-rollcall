"use client";
import { GroupPath, Path } from "@/helper/Path";
import { EventContext, GroupContext, UserContext } from "@/lib/context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import {
  UserGroupIcon,
  Cog6ToothIcon,
  PencilIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { UserGroupIcon as UserGroupIconSolid } from "@heroicons/react/24/solid";
import GroupBadge from "./event/GroupBadge";
import { getUniversityKey, University } from "@/models/University";
import { logOut } from "@/lib/auth";

export default function Topbar({ openModal }: { openModal?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user] = useContext(UserContext);
  const [group] = useContext(GroupContext);
  console.log(pathname);
  const [event] = useContext(EventContext);

  return (
    <nav className="bg-white fixed w-full z-40 top-0 start-0">
      <div className="flex items-center justify-between px-6 py-6">
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
          <div className="flex items-center justify-end">
            <PencilIcon
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
              onClick={openModal}
            />
          </div>
        ) : user ? (
          <div className="flex items-center justify-end gap-4">
            <ArrowLeftEndOnRectangleIcon
              className="cursor-pointer w-7 h-7 text-gray-500"
              onClick={logOut}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}
