import { useContext } from "react";
import { UserContext } from "../lib/context";
import { redirect } from "next/navigation";
import { Path } from "../helper/Path";

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const user = useContext(UserContext);

  return user ? props.children : props.fallback || redirect(Path.LogIn);
}
