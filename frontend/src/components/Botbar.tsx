"use client";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import Link from "next/link";
import { Path } from "helper/Path";

export default function Botbar() {
  const user = useContext(UserContext);
  return (
    <nav className="bg-neutral-100 fixed w-full z-20 bottom-0 start-0">
      <div className="flex flex-wrap items-center justify-between mx-auto px-8 py-6">
        <Link
          type="button"
          href={`${Path.Group}/1`}
          className="text-gray-900 bg-transparent border hover:bg-gray-200 border-black font-semibold text-xs px-3 py-1.5"
        >
          Teams
        </Link>
        <button
          type="button"
          className="text-gray-900 bg-transparent border hover:bg-gray-200 border-black font-semibold text-xs px-3 py-1.5"
        >
          Create New Event
        </button>
        <button
          type="button"
          className="text-gray-900 bg-transparent border hover:bg-gray-200 border-black font-semibold text-xs px-3 py-1.5"
        >
          Settings
        </button>
      </div>
    </nav>
  );
}
