import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface AttendanceSearchBarProps {
  disabled: boolean;
  searchInput: string;
  setSearchInput: (input: string) => void;
}

export default function AttendanceSearchBar({
  disabled,
  searchInput,
  setSearchInput,
}: AttendanceSearchBarProps) {
  return (
    <div className="flex w-full border-y-[1px] py-2 border-gray-300 items-center">
      <MagnifyingGlassIcon className="w-6 h-6 mr-2 text-gray-500" />
      <input
        disabled={disabled}
        value={searchInput}
        placeholder={
          !disabled
            ? "Search members"
            : "Click the pencil or the bottom banner to edit!"
        }
        className="w-full placeholder:text-sm placeholder:font-thin placeholder:align-middle outline-none"
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
      <div className={"p-0.5 " + (disabled ?? "cursor-pointer")}>
        <XCircleIcon
          className="w-7 h-7 mr-2 text-gray-500"
          onClick={() => !disabled && setSearchInput("")}
        />
      </div>
    </div>
  );
}
