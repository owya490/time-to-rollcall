export default function Loader({ show }: { show: boolean }) {
  return show ? (
    <div className="border-solid border-t-black border-8 rounded-[50%] w-12 h-12 animate-spin duration-2000 ease-linear"></div>
  ) : null;
}
