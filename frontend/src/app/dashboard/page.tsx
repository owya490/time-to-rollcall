"use client";
import { useContext } from "react";
import { UserContext } from "../../lib/context";
import AuthCheck from "../../components/AuthCheck";

export default function Dashboard() {
  const user = useContext(UserContext);
  return (
    <main>
      <AuthCheck>
        <p>
          This is the normal dashboard page that a user goes to when they are
          logged in {user?.displayName}
        </p>
      </AuthCheck>
    </main>
  );
}
