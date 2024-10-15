import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface AttendanceSearchBarProps {
  searchInput: string;
  setSearchInput: (input: string) => void;
}

export default function AttendanceSearchBar({
  searchInput,
  setSearchInput,
}: AttendanceSearchBarProps) {
  return (
    <div className="flex w-full border-y-[1px] py-2 border-gray-300 items-center">
      <MagnifyingGlassIcon className="w-6 h-6 mr-2 text-gray-500" />
      <input
        value={searchInput}
        placeholder="Search members"
        className="w-full placeholder:text-sm placeholder:font-thin placeholder:align-middle outline-none"
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
      <div className="cursor-pointer p-0.5">
        <XCircleIcon
          className=" w-7 h-7 mr-2 text-gray-500"
          onClick={() => setSearchInput("")}
        />
      </div>
    </div>
  );
}
