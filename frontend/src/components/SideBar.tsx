import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Path } from "./Path";
import { User, signOut } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { auth } from "../lib/firebase";

export default function Sidebar({
  show,
  setter,
  user,
}: {
  show: boolean;
  setter: Dispatch<SetStateAction<boolean>>;
  user: User;
}) {
  // Define our base class
  const className =
    "bg-black w-24 transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  // Append class based on state of sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  // Clickable menu items
  const MenuItem = ({
    name,
    route,
    onClick,
  }: {
    name: string;
    route?: string;
    onClick?: () => void;
  }) => {
    // Highlight menu item based on currently displayed route
    const colorClass =
      usePathname() === route ? "text-white" : "text-white/50 hover:text-white";

    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal) => !oldVal);
          onClick();
        }}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
      >
        {/* <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div> */}
        <div>{name}</div>
      </Link>
    );
  };

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal) => !oldVal);
      }}
    />
  );
  const router = useRouter();

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="p-2 flex">
          <Link
            href={user ? Path.Dashboard : Path.LandingPage}
            className="text-white"
          >
            {user ? user.displayName : "Welcome"}
          </Link>
        </div>
        <div className="flex flex-col">
          <MenuItem
            name={user ? "Dashboard" : "Home"}
            route={user ? Path.Dashboard : Path.LandingPage}
          />
          <MenuItem name="Create group" route={Path.CreateGroup} />
          {!user ? (
            <MenuItem name="Log in" route={Path.LogIn} />
          ) : (
            <MenuItem
              name="Log out"
              route={""}
              onClick={() => {
                signOut(auth);
                router.refresh();
              }}
            />
          )}
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
