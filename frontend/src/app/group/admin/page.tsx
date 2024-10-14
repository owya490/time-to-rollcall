"use client";
import AuthCheck from "@/components/AuthCheck";
import Topbar from "@/components/Topbar";
import { Path } from "@/helper/Path";
import { UserContext } from "@/lib/context";
import { getGroups } from "@/lib/groups";
import { GroupModel } from "@/models/Group";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function GroupAdmin() {
  const [user] = useContext(UserContext);
  const router = useRouter();
  const [groups, setGroups] = useState<GroupModel[]>([]);

  useEffect(() => {
    if (user) {
      if (user?.role !== "admin") {
        router.push(Path.Group);
      }
      getGroups(user.groups).then((groups) => setGroups(groups));
    }
  }, [user]);

  return (
    user && (
      <AuthCheck>
        <Topbar />
        <div className="mx-6">
          <h1 className="text-2xl text-gray-700 mb-4">Admin Page</h1>
          <button type="button" className="p-2 bg-slate-200">
            Add all leaders
          </button>
        </div>
      </AuthCheck>
    )
  );
}
