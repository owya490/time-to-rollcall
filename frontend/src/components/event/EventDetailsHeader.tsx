import LiveBadge from "./LiveBadge";

export default function EventDetailsHeader() {
  return (
    <div className="flex items-center w-full h-min">
      <p className="text-gray-500 font-light text-sm">28.11.23</p>
      <div className="flex ml-auto">
        <LiveBadge />
      </div>
    </div>
  );
}
