import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUser } from "./user";
import { User } from "@/models/User";
import { GroupModel } from "@/models/Group";
import { getGroup } from "./groups";

// Custom hook to read auth record and user profile doc
export function useUserData() {
  const [userAuth] = useAuthState(auth);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userAuth) {
      getUser(userAuth.uid).then((user) => setUser(user));
    } else {
      setUser(null);
    }
  }, [userAuth]);

  return userAuth ? { ...userAuth, ...user } : undefined;
}

// Custom hook to read auth record and user profile doc
export function useGroupData(groupId: string) {
  const [group, setGroup] = useState<GroupModel | null>(null);

  useEffect(() => {
    getGroup(groupId).then((group) => setGroup(group));
  }, []);

  return group;
}
