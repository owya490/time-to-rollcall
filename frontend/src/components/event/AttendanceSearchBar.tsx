import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function AttendanceSearchBar() {
  return (
    <div className="flex w-full h-12 border-y-[1px] py-4 border-gray-300 items-center">
      <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
      <input
        placeholder="Search to add members"
        className="placeholder:text-sm placeholder:font-thin placeholder:align-middle"
      ></input>
    </div>
  );
}
