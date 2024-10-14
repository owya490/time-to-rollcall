"use client";
import { GroupPath, Path } from "@/helper/Path";
import { GroupContext, UserContext } from "@/lib/context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { UserIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user] = useContext(UserContext);
  const [group] = useContext(GroupContext);
  return (
    <nav className="bg-white fixed w-full z-50 top-0 start-0">
      <div className="flex items-center justify-between px-6 py-6">
        {group ? (
          <Link
            href={
              pathname === Path.Group + "/" + group.id
                ? Path.Group
                : Path.Group + "/" + group.id
            }
            className="bg-gray-500 text-white rounded-3xl text-sm p-1 px-3"
          >
            {group.name}
          </Link>
        ) : (
          <p className="text-lg text-gray-500">Hi {user?.displayName}</p>
        )}
        {group && (
          <div className="flex items-center justify-end gap-4">
            <UserIcon
              className="w-6 h-6 mr-2 text-gray-500"
              onClick={() =>
                router.push(Path.Group + "/" + group.id + GroupPath.Members)
              }
            />
            <Cog6ToothIcon
              className="w-6 h-6 mr-2 text-gray-500"
              onClick={() =>
                router.push(Path.Group + "/" + group.id + GroupPath.Settings)
              }
            />
          </div>
        )}
      </div>
    </nav>
  );
}
