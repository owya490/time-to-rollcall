import { TagModel } from "@/models/Tag";
type ColourClass = {
  bg: string;
  fill: string;
  bgSelected: string;
  hex: string;
};

type ColourClasses = {
  [key: string]: ColourClass;
};

export const colourClasses: ColourClasses = {
  gray: {
    bg: "bg-gray-100 border-gray-100 text-gray-500",
    fill: "fill-gray-400",
    bgSelected: "bg-gray-300 border-gray-600 text-gray-900",
    hex: "#9CA3AF", // Gray
  },
  red: {
    bg: "bg-red-100 border-red-100 text-red-500",
    fill: "fill-red-400",
    bgSelected: "bg-red-300 border-red-600 text-red-900",
    hex: "#EF4444", // Red
  },
  orange: {
    bg: "bg-orange-100 border-orange-100 text-orange-500",
    fill: "fill-orange-400",
    bgSelected: "bg-orange-300 border-orange-600 text-orange-900",
    hex: "#F97316", // Orange
  },
  amber: {
    bg: "bg-amber-100 border-amber-100 text-amber-500",
    fill: "fill-amber-400",
    bgSelected: "bg-amber-300 border-amber-600 text-amber-900",
    hex: "#F59E0B", // Amber
  },
  yellow: {
    bg: "bg-yellow-100 border-yellow-100 text-yellow-500",
    fill: "fill-yellow-400",
    bgSelected: "bg-yellow-300 border-yellow-600 text-yellow-900",
    hex: "#EAB308", // Yellow
  },
  lime: {
    bg: "bg-lime-100 border-lime-100 text-lime-500",
    fill: "fill-lime-400",
    bgSelected: "bg-lime-300 border-lime-600 text-lime-900",
    hex: "#84CC16", // Lime
  },
  green: {
    bg: "bg-green-100 border-green-100 text-green-500",
    fill: "fill-green-400",
    bgSelected: "bg-green-300 border-green-600 text-green-900",
    hex: "#22C55E", // Green
  },
  emerald: {
    bg: "bg-emerald-100 border-emerald-100 text-emerald-500",
    fill: "fill-emerald-400",
    bgSelected: "bg-emerald-300 border-emerald-600 text-emerald-900",
    hex: "#10B981", // Emerald
  },
  teal: {
    bg: "bg-teal-100 border-teal-100 text-teal-500",
    fill: "fill-teal-400",
    bgSelected: "bg-teal-300 border-teal-600 text-teal-900",
    hex: "#14B8A6", // Teal
  },
  cyan: {
    bg: "bg-cyan-100 border-cyan-100 text-cyan-500",
    fill: "fill-cyan-400",
    bgSelected: "bg-cyan-300 border-cyan-600 text-cyan-900",
    hex: "#06B6D4", // Cyan
  },
  blue: {
    bg: "bg-blue-100 border-blue-100 text-blue-500",
    fill: "fill-blue-400",
    bgSelected: "bg-blue-300 border-blue-600 text-blue-900",
    hex: "#3B82F6", // Blue
  },
  indigo: {
    bg: "bg-indigo-100 border-indigo-100 text-indigo-500",
    fill: "fill-indigo-400",
    bgSelected: "bg-indigo-300 border-indigo-600 text-indigo-900",
    hex: "#6366F1", // Indigo
  },
  violet: {
    bg: "bg-violet-100 border-violet-100 text-violet-500",
    fill: "fill-violet-400",
    bgSelected: "bg-violet-300 border-violet-600 text-violet-900",
    hex: "#8B5CF6", // Violet
  },
  purple: {
    bg: "bg-purple-100 border-purple-100 text-purple-500",
    fill: "fill-purple-400",
    bgSelected: "bg-purple-300 border-purple-600 text-purple-900",
    hex: "#A855F7", // Purple
  },
  fuchsia: {
    bg: "bg-fuchsia-100 border-fuchsia-100 text-fuchsia-500",
    fill: "fill-fuchsia-400",
    bgSelected: "bg-fuchsia-300 border-fuchsia-600 text-fuchsia-900",
    hex: "#D946EF", // Fuchsia
  },
  pink: {
    bg: "bg-pink-100 border-pink-100 text-pink-500",
    fill: "fill-pink-400",
    bgSelected: "bg-pink-300 border-pink-600 text-pink-900",
    hex: "#EC4899", // Pink
  },
  rose: {
    bg: "bg-rose-100 border-rose-100 text-rose-500",
    fill: "fill-rose-400",
    bgSelected: "bg-rose-300 border-rose-600 text-rose-900",
    hex: "#F43F5E", // Rose
  },
};

export const getColourClasses = (colour?: keyof ColourClasses) => {
  return colour ? colourClasses[colour] : colourClasses.blue;
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
      className={`rounded-3xl border-2 px-2 py-1 mr-2 my-1 text-xs font-medium ${
        selected ? bgSelected : bg
      } ${className}`}
      onClick={onClick}
    >
      {tag.name}
    </button>
  );
}
