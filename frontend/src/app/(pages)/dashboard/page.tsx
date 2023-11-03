"use client";
import { useContext } from "react";
import { UserContext } from "../../../lib/context";
import AuthCheck from "../../../components/AuthCheck";
import toast from "react-hot-toast";

export default function Dashboard() {
  const user = useContext(UserContext);
  return (
    <main>
      <AuthCheck>
        <p>
          This is the normal dashboard page that a user goes to when they are
          logged in {user?.displayName}
        </p>
        <button onClick={() => toast.success("hello toast")}>
          Display Toast
        </button>
      </AuthCheck>
    </main>
  );
}
