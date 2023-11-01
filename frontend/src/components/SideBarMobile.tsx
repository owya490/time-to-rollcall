import Link from "next/link";
import { Path } from "./Path";
import { Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";

export default function SideBarMobile({
  setter,
  user,
}: {
  setter: Dispatch<SetStateAction<boolean>>;
  user: User;
}) {
  return (
    <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-16 bg-black flex [&>*]:my-auto px-2">
      <button
        className="text-4xl flex text-white"
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
      >
        hello
      </button>
      <Link href={Path.LandingPage} className="mx-auto">
        home
      </Link>
      {!user && (
        <Link className="text-3xl flex text-white" href={Path.LogIn}>
          Log in
        </Link>
      )}
    </nav>
  );
}
