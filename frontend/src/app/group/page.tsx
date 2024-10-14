"use client";
import AuthCheck from "@/components/AuthCheck";
import Topbar from "@/components/Topbar";
import { Path } from "@/helper/Path";
import { UserContext } from "@/lib/context";
import { getGroups } from "@/lib/groups";
import { GroupModel } from "@/models/Group";
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
        <div className="flex gap-2 my-4">
          {groups.map((group, i) => (
            <Link
              key={i}
              className="bg-gray-700 text-white rounded-3xl text-sm py-2 px-3 mb-4"
              href={`${Path.Group}/${group.id}`}
            >
              {group.name}
            </Link>
          ))}
        </div>
        <p>TODO: Create Team</p>
      </div>
    </AuthCheck>
  );
}
