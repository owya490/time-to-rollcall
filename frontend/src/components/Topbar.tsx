"use client";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import Link from "next/link";
import { Path } from "../helper/Path";
import { logOut } from "@/lib/auth";

export default function Topbar() {
  const user = useContext(UserContext);
  return (
    <nav className="bg-neutral-100 fixed w-full z-20 top-0 start-0">
      <div className="flex flex-wrap items-center justify-between mx-auto px-9 py-6">
        <Link
          href={Path.Dashboard}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-600">
              <svg
                className="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="font-medium">
              <div>{user?.displayName}</div>
              <div className="text-sm text-[#7a7a7a]">{user?.email}</div>
            </div>
          </div>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            onClick={() => logOut()}
            className="text-gray-900 bg-transparent border hover:bg-gray-200 border-black font-semibold text-xs px-3 py-1.5"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
