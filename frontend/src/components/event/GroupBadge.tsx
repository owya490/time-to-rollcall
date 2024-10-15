import {
  getUniversityKey,
  University,
  universityColours,
} from "@/models/University";

export default function GroupBadge({
  campus,
  className,
}: {
  campus: University;
  className?: string;
}) {
  return (
    <p
      className={`rounded-full py-1 px-1 bg-black text-white font-light text-center ${className}`}
      style={{ backgroundColor: universityColours[campus] }}
    >
      {getUniversityKey(campus)}
    </p>
  );
}
