"use client";

export default function Botbar({
  groupId,
  openModal,
}: {
  groupId: string;
  openModal: () => void;
}) {
  return (
    <nav className="h-full border-gray-700 bg-white">
      <div className="fixed z-10 h-16 w-full max-w-max px-3 -translate-x-1/2 bottom-10 left-1/2">
        <div className="h-full mx-auto flex">
          <div className="bg-gray-100 border border-gray-100 rounded-full grid h-full max-w-lg grid-cols-4 ">
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-3 m-2 rounded-full hover:bg-gray-200 "
            >
              Live
            </button>
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-3 m-2 rounded-full hover:bg-gray-200"
            >
              Newest
            </button>
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-3 m-2 rounded-full hover:bg-gray-200"
            >
              Oldest
            </button>
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-3 m-2 rounded-full hover:bg-gray-200"
            >
              Tags
            </button>
          </div>
          <div className="bg-neutral-950 border border-neutral-950 rounded-full grid h-full max-w-lg">
            <button
              type="button"
              onClick={openModal}
              className="inline-flex flex-col items-center justify-center px-6 rounded-full"
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
                  stroke-width="2"
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
