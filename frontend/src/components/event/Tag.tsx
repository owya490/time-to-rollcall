import { TagModel } from "@/models/Tag";
type ColourClass = {
  bg: string;
  text: string;
};

type ColourClasses = {
  [key: string]: ColourClass; // You can also specify the keys if needed
};

const colourClasses: ColourClasses = {
  black: { bg: "bg-black", text: "text-black" },
  white: { bg: "bg-white", text: "text-white" },
  gray: {
    bg: "bg-gray-100",
    text: "text-gray-900",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-900",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-900",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-900",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-900",
  },
  lime: {
    bg: "bg-lime-100",
    text: "text-lime-900",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-900",
  },
  emerald: {
    bg: "bg-emerald-100",
    text: "text-emerald-900",
  },
  teal: {
    bg: "bg-teal-100",
    text: "text-teal-900",
  },
  cyan: {
    bg: "bg-cyan-100",
    text: "text-cyan-900",
  },
  lightBlue: {
    bg: "bg-lightBlue-100",
    text: "text-lightBlue-900",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-900",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-900",
  },
  violet: {
    bg: "bg-violet-100",
    text: "text-violet-900",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-900",
  },
  fuchsia: {
    bg: "bg-fuchsia-100",
    text: "text-fuchsia-900",
  },
  pink: {
    bg: "bg-pink-100",
    text: "text-pink-900",
  },
  rose: {
    bg: "bg-rose-100",
    text: "text-rose-900",
  },
};

// Optionally, you can define a function to get colour classes based on the input colour.
const getcolourClasses = (colour: keyof ColourClasses) => {
  return colourClasses[colour]; // Default to gray if colour not found
};

export default function Tag({
  tag,
  disabled,
  onClick,
}: {
  tag: TagModel;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const { bg, text } = tag.colour
    ? getcolourClasses(tag.colour)
    : colourClasses.blue;

  return (
    <button
      type="button"
      disabled={disabled}
      className={`rounded-3xl border-transparent border-2 px-2 py-1 mr-2 my-1 text-xs font-medium ${bg} ${text}`}
      onClick={onClick}
    >
      {tag.name}
    </button>
  );
}
