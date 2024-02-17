"use client";

import { Filter, filters } from "@/helper/Filter";

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
    <nav className="flex justify-center h-full border-gray-700 bg-white">
      <div className="fixed z-10 h-14 w-full max-w-max px-3 bottom-3">
        <div className="h-full flex">
          <div className="bg-gray-100 border border-gray-100 rounded-full grid h-full w-full grid-cols-4">
            {filters.map((f, i) => (
              <button
                key={i}
                className={
                  filter.name === f.name
                    ? "inline-flex flex-col items-center justify-center px-3 my-3 mx-1 rounded-full bg-gray-200"
                    : "inline-flex flex-col items-center justify-center px-3 my-3 mx-1 rounded-full hover:bg-gray-200"
                }
                onClick={() => filterEvents(f)}
              >
                {f.name}
              </button>
            ))}
          </div>
          <div className="bg-neutral-950 border border-neutral-950 rounded-full grid h-full max-w-lg">
            <button
              type="button"
              onClick={openModal}
              className="inline-flex flex-col items-center justify-center px-5 rounded-full"
            >
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
