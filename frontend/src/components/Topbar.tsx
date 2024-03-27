"use client";
import { useContext } from "react";
import { GroupContext, UserContext } from "@/lib/context";
import Link from "next/link";
import { Path } from "@/helper/Path";

export default function Topbar() {
  const user = useContext(UserContext);
  const [group, _] = useContext(GroupContext);
  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0">
      <div className="flex items-center justify-between px-6 py-6">
        {group ? (
          <Link
            href={Path.Group}
            className="bg-gray-500 text-white rounded-3xl text-sm p-1 px-3"
          >
            {group.name}
          </Link>
        ) : (
          <p className="text-lg text-gray-500">Hi {user?.displayName}</p>
        )}
        <div className="flex items-center justify-end gap-4">
          {group && (
            <Link href={Path.GroupMember}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="gray"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="gray"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
}
