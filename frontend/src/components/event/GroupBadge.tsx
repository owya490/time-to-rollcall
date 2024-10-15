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
  const universityKey = getUniversityKey(campus);
  return (
    universityKey && (
      <p
        className={`rounded-full py-1 px-1 bg-black text-white font-light text-center ${className}`}
        style={{ backgroundColor: universityColours[campus] }}
      >
        {getUniversityKey(campus)}
      </p>
    )
  );
}
