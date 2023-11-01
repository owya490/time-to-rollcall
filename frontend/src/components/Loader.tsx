export default function Loader({ show }: { show: boolean }) {
  return show ? (
    <div className=" border-solid border-t-blue-500 border-8 rounded-[50%] w-12 h-12 animate-spin duration-2000 ease-linear"></div>
  ) : null;
}
