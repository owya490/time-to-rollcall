import { TagModel } from "@/models/Tag";
type ColourClass = {
  bg: string;
  text: string;
  bgSelected: string;
};

type ColourClasses = {
  [key: string]: ColourClass; // You can also specify the keys if needed
};

const colourClasses: ColourClasses = {
  black: { bg: "bg-black", text: "text-black", bgSelected: "bg-blac-400" },
  white: { bg: "bg-white", text: "text-white", bgSelected: "bg-whit-400" },
  gray: {
    bg: "bg-gray-100",
    text: "text-gray-900",
    bgSelected: "bg-gray-400",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-900",
    bgSelected: "bg-red-400",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-900",
    bgSelected: "bg-orange-400",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-900",
    bgSelected: "bg-amber-400",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-900",
    bgSelected: "bg-yellow-400",
  },
  lime: {
    bg: "bg-lime-100",
    text: "text-lime-900",
    bgSelected: "bg-lime-400",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-900",
    bgSelected: "bg-green-400",
  },
  emerald: {
    bg: "bg-emerald-100",
    text: "text-emerald-900",
    bgSelected: "bg-emerald-400",
  },
  teal: {
    bg: "bg-teal-100",
    text: "text-teal-900",
    bgSelected: "bg-teal-400",
  },
  cyan: {
    bg: "bg-cyan-100",
    text: "text-cyan-900",
    bgSelected: "bg-cyan-400",
  },
  lightBlue: {
    bg: "bg-lightBlue-100",
    text: "text-lightBlue-900",
    bgSelected: "bg-lightBlue-400",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-900",
    bgSelected: "bg-blue-400",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-900",
    bgSelected: "bg-indigo-400",
  },
  violet: {
    bg: "bg-violet-100",
    text: "text-violet-900",
    bgSelected: "bg-violet-400",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-900",
    bgSelected: "bg-purple-400",
  },
  fuchsia: {
    bg: "bg-fuchsia-100",
    text: "text-fuchsia-900",
    bgSelected: "bg-fuchsia-400",
  },
  pink: {
    bg: "bg-pink-100",
    text: "text-pink-900",
    bgSelected: "bg-pink-400",
  },
  rose: {
    bg: "bg-rose-100",
    text: "text-rose-900",
    bgSelected: "bg-rose-400",
  },
};

// Optionally, you can define a function to get colour classes based on the input colour.
const getcolourClasses = (colour: keyof ColourClasses) => {
  return colourClasses[colour]; // Default to gray if colour not found
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
  const { bg, text, bgSelected } = tag.colour
    ? getcolourClasses(tag.colour)
    : colourClasses.blue;

  return (
    <button
      type="button"
      disabled={disabled}
      className={`rounded-3xl border-transparent border-2 px-2 py-1 mr-2 my-1 text-xs font-medium ${
        selected ? bgSelected : bg
      } ${text} ${className}`}
      onClick={onClick}
    >
      {tag.name}
    </button>
  );
}
