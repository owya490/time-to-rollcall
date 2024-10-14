import { getUniversityKey, University } from "@/models/University";

const universityColours: Record<University, string> = {
  [University.USYD]: "#B5403D",
  [University.UNSW]: "#619445",
  [University.UTS]: "#3B5499",
  [University.MACQ]: "#F2C259",
  [University.ACU]: "#57427A",
};

export default function GroupBadge({ campus }: { campus: University }) {
  return (
    <div
      className={`rounded-full py-1 px-2 bg-black`}
      style={{ backgroundColor: universityColours[campus] }}
    >
      <p className="text-white text-xs font-light w-9 text-center">
        {getUniversityKey(campus)}
      </p>
    </div>
  );
}
