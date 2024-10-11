import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUser } from "./users";
import { User } from "@/models/User";
import { GroupModel } from "@/models/Group";
import { getGroup } from "./groups";

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

export function useGroupData(groupId: string) {
  const groupState = useState<GroupModel | null>(null);

  useEffect(() => {
    getGroup(groupId).then((group) => groupState[1](group));
  }, [groupId]);

  return groupState;
}
