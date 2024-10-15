"use client";
import AuthCheck from "@/components/AuthCheck";
import GroupBadge from "@/components/event/GroupBadge";
import Topbar from "@/components/Topbar";
import { Path } from "@/helper/Path";
import { UserContext } from "@/lib/context";
import { getGroups } from "@/lib/groups";
import { GroupModel } from "@/models/Group";
import { getUniversityKey, University } from "@/models/University";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Groups() {
  const [user] = useContext(UserContext);
  const [groups, setGroups] = useState<GroupModel[]>([]);

  useEffect(() => {
    if (user) {
      getGroups(user.groups).then((groups) => setGroups(groups));
    }
  }, [user]);

  return (
    <AuthCheck>
      <Topbar />
      <div className="mx-6">
        <h1 className="text-2xl text-gray-700 mb-4">Your Teams</h1>
        <div className="flex flex-wrap gap-2 my-4">
          {groups.map((group, i) =>
            getUniversityKey(group.name as University) ? (
              <Link key={i} href={`${Path.Group}/${group.id}`}>
                <GroupBadge
                  campus={group.name as University}
                  className="px-4"
                />
              </Link>
            ) : (
              <Link
                key={i}
                href={`${Path.Group}/${group.id}`}
                className="bg-gray-900 rounded-full py-1 px-4 text-white font-light text-center"
              >
                {group.name}
              </Link>
            )
          )}
        </div>
        <p>TODO: Create Team</p>
      </div>
    </AuthCheck>
  );
}
