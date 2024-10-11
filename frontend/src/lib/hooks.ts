import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUser } from "./users";
import { User } from "@/models/User";
import { GroupModel } from "@/models/Group";
import { getGroup } from "./groups";
import { MemberModel } from "@/models/Member";
import { getMembers } from "./members";

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

export function useMembersData(groupId: string) {
  const membersState = useState<MemberModel[] | null>([]);

  useEffect(() => {
    getMembers(groupId).then((members) => membersState[1](members));
  }, [groupId]);

  return membersState;
}
