"use client";
import AuthCheck from "@/components/AuthCheck";
import Topbar from "@/components/Topbar";
import { Path } from "@/helper/Path";
import { UserContext } from "@/lib/context";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function GroupAdmin() {
  const user = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user?.role !== "admin") {
        router.push(Path.Group);
      }
    }
    // eslint-disable-next-line
  }, [user]);

  const addMembers = async () => {};

  return (
    user && (
      <AuthCheck>
        <Topbar />
        <div className="mx-6">
          <h1 className="text-2xl text-gray-700 mb-4">Admin Page</h1>
          <button
            type="button"
            className="p-2 bg-slate-200"
            onClick={() => addMembers()}
          >
            Add all leaders
          </button>
        </div>
      </AuthCheck>
    )
  );
}
