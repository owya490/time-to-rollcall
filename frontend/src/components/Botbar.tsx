"use client";

import { Filter, filters, newestFilter } from "@/helper/Filter";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function Botbar({
  filter,
  filterEvents,
  openModal,
}: {
  filter: Filter;
  filterEvents: (f: Filter) => void;
  openModal: () => void;
}) {
  return (
    <nav className="flex justify-center h-full border-gray-700">
      <div className="fixed z-10 h-12 w-full max-w-max px-3 bottom-3">
        <div className="h-full flex items-center">
          <div className="bg-gray-200 bg-opacity-70 backdrop-blur-lg rounded-full grid w-full grid-cols-4 px-2">
            {filters.map((f, i) => (
              <button
                key={i}
                className={
                  "inline-flex flex-col items-center justify-center px-3 py-3 my-1 h-8 rounded-full " +
                  (filter.name === f.name ? "bg-white" : "hover:bg-white")
                }
                onClick={() =>
                  filterEvents(filter.name === f.name ? newestFilter : f)
                }
              >
                {f.name}
              </button>
            ))}
          </div>
          <PlusCircleIcon
            className="w-14 h-14 text-black"
            onClick={openModal}
          />
        </div>
      </div>
    </nav>
  );
}
