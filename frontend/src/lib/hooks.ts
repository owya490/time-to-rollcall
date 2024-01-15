import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUser } from "./user";
import { User } from "@/models/User";

// Custom hook to read auth record and user profile doc
export function useUserData() {
  const [userAuth] = useAuthState(auth);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userAuth) {
      getUser(userAuth.uid).then((user) => setUser({ ...user, ...userAuth }));
    }
  }, [userAuth]);

  return { ...user, userAuth };
}
