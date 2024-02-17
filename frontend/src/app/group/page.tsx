"use client";
import AuthCheck from "@/components/AuthCheck";
import { Path } from "@/helper/Path";
import { UserContext } from "@/lib/context";
import { getGroups } from "@/lib/groups";
import { GroupModel } from "@/models/Group";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Groups() {
  const user = useContext(UserContext);
  const [groups, setGroups] = useState<GroupModel[]>([]);

  useEffect(() => {
    getGroups(user.groups).then((groups) => setGroups(groups));
  }, [user]);

  return (
    <AuthCheck>
      <h1 className="p-3 text-2xl text-gray-500">Your Teams</h1>
      {groups.map((group, i) => (
        <Link key={i} href={`${Path.Group}/${group.id}`}>
          {group.name}
        </Link>
      ))}
    </AuthCheck>
  );
}
