import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface AttendanceSearchBarProps {
  searchInput: string;
  setSearchInput: (input: string) => void;
}

export default function AttendanceSearchBar({
  searchInput,
  setSearchInput,
}: AttendanceSearchBarProps) {
  return (
    <div className="flex w-full h-12 border-y-[1px] py-4 border-gray-300 items-center">
      <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
      <input
        value={searchInput}
        placeholder="Search to add members"
        className="w-full placeholder:text-sm placeholder:font-thin placeholder:align-middle outline-none"
        onChange={(e) => {
          console.log(e.target.value);
          setSearchInput(e.target.value);
        }}
      ></input>
    </div>
  );
}
