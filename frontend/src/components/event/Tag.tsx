import { TagModel } from "@/models/Tag";
type ColourClass = {
  bg: string;
  fill: string;
  bgSelected: string;
};

type ColourClasses = {
  [key: string]: ColourClass; // You can also specify the keys if needed
};

export const colourClasses: ColourClasses = {
  gray: {
    bg: "bg-gray-100 text-gray-500",
    fill: "fill-gray-400",
    bgSelected: "bg-gray-300 border-gray-600 text-gray-900",
  },
  red: {
    bg: "bg-red-100 text-red-500",
    fill: "fill-red-400",
    bgSelected: "bg-red-300 border-red-600 text-red-900",
  },
  orange: {
    bg: "bg-orange-100 text-orange-500",
    fill: "fill-orange-400",
    bgSelected: "bg-orange-300 border-orange-600 text-orange-900",
  },
  amber: {
    bg: "bg-amber-100 text-amber-500",
    fill: "fill-amber-400",
    bgSelected: "bg-amber-300 border-amber-600 text-amber-900",
  },
  yellow: {
    bg: "bg-yellow-100 text-yellow-500",
    fill: "fill-yellow-400",
    bgSelected: "bg-yellow-300 border-yellow-600 text-yellow-900",
  },
  lime: {
    bg: "bg-lime-100 text-lime-500",
    fill: "fill-lime-400",
    bgSelected: "bg-lime-300 border-lime-600 text-lime-900",
  },
  green: {
    bg: "bg-green-100 text-green-500",
    fill: "fill-green-400",
    bgSelected: "bg-green-300 border-green-600 text-green-900",
  },
  emerald: {
    bg: "bg-emerald-100 text-emerald-500",
    fill: "fill-emerald-400",
    bgSelected: "bg-emerald-300 border-emerald-600 text-emerald-900",
  },
  teal: {
    bg: "bg-teal-100 text-teal-500",
    fill: "fill-teal-400",
    bgSelected: "bg-teal-300 border-teal-600 text-teal-900",
  },
  cyan: {
    bg: "bg-cyan-100 text-cyan-500",
    fill: "fill-cyan-400",
    bgSelected: "bg-cyan-300 border-cyan-600 text-cyan-900",
  },
  blue: {
    bg: "bg-blue-100 text-blue-500",
    fill: "fill-blue-400",
    bgSelected: "bg-blue-300 border-blue-600 text-blue-900",
  },
  indigo: {
    bg: "bg-indigo-100 text-indigo-500",
    fill: "fill-indigo-400",
    bgSelected: "bg-indigo-300 border-indigo-600 text-indigo-900",
  },
  violet: {
    bg: "bg-violet-100 text-violet-500",
    fill: "fill-violet-400",
    bgSelected: "bg-violet-300 border-violet-600 text-violet-900",
  },
  purple: {
    bg: "bg-purple-100 text-purple-500",
    fill: "fill-purple-400",
    bgSelected: "bg-purple-300 border-purple-600 text-purple-900",
  },
  fuchsia: {
    bg: "bg-fuchsia-100 text-fuchsia-500",
    fill: "fill-fuchsia-400",
    bgSelected: "bg-fuchsia-300 border-fuchsia-600 text-fuchsia-900",
  },
  pink: {
    bg: "bg-pink-100 text-pink-500",
    fill: "fill-pink-400",
    bgSelected: "bg-pink-300 border-pink-600 text-pink-900",
  },
  rose: {
    bg: "bg-rose-100 text-rose-500",
    fill: "fill-rose-400",
    bgSelected: "bg-rose-300 border-rose-600 text-rose-900",
  },
};

// Optionally, you can define a function to get colour classes based on the input colour.
export const getColourClasses = (colour?: keyof ColourClasses) => {
  return colour ? colourClasses[colour] : colourClasses.blue; // Default to gray if colour not found
};

export default function Tag({
  tag,
  selected,
  disabled,
  onClick,
  className,
}: {
  tag: TagModel;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}) {
  const { bg, bgSelected } = getColourClasses(tag.colour);

  return (
    <button
      type="button"
      disabled={disabled}
      className={`rounded-3xl border-transparent border-2 px-2 py-1 mr-2 my-1 text-xs font-medium ${
        selected ? bgSelected : bg
      } ${className}`}
      onClick={onClick}
    >
      {tag.name}
    </button>
  );
}
