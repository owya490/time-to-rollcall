"use client";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import AuthCheck from "@/components/AuthCheck";
import toast from "react-hot-toast";

export default function Dashboard() {
  const user = useContext(UserContext);
  return (
    <main>
      <AuthCheck>
        <p>
          This is the page which a user sees when they log in,{" "}
          {user?.displayName}. It will display the list of groups, or maybe we
          can just make them automatically go to the group they last visited
          like discord
        </p>
        <p>
          [] - SOW-418: TODO Sidebar and layout - remember the sidebar needs to
          be displayed on all the pages so edit the SideBar
        </p>
        <button onClick={() => toast.success("hello toast")}>
          Display Toast
        </button>
      </AuthCheck>
    </main>
  );
}
