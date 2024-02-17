"use client";
import Link from "next/link";
import { Path } from "helper/Path";

export default function Botbar({
  groupId,
  openModal,
}: {
  groupId: string;
  openModal: () => void;
}) {
  return (
    <nav className="bg-neutral-100 fixed w-full pb-96 z-10 -bottom-96 start-0">
      <div className="flex flex-wrap items-center justify-between mx-auto px-8 py-6">
        <Link
          type="button"
          href={Path.Group}
          className="text-gray-900 bg-transparent border hover:bg-gray-200 border-black font-semibold text-xs px-3 py-1.5"
        >
          Groups
        </Link>
        <button
          type="button"
          onClick={openModal}
          className="text-gray-900 bg-transparent border hover:bg-gray-200 border-black font-semibold text-xs px-3 py-1.5"
        >
          Create New Event
        </button>
        <Link
          type="button"
          href={`${Path.Group}/${groupId}/settings`}
          className="text-gray-900 bg-transparent border hover:bg-gray-200 border-black font-semibold text-xs px-3 py-1.5"
        >
          Settings
        </Link>
      </div>
    </nav>
  );
}
