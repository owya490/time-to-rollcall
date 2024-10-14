import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { addGroupToUserGroups, getUser } from "./users";
import { User } from "@/models/User";
import { GroupModel } from "@/models/Group";
import { getGroup } from "./groups";
import { MemberModel } from "@/models/Member";
import { getMembers } from "./members";

export function useUserData() {
  const [userAuth] = useAuthState(auth);
  const userState = useState<User | null | undefined>(undefined);

  useEffect(() => {
    if (userAuth) {
      getUser(userAuth.uid).then((user) =>
        userState[1]({ ...userAuth, ...user })
      );
    } else {
      userState[1](undefined);
    }
  }, [userAuth]);

  return userState;
}

export function useGroupData(user: User | null | undefined, groupId: string) {
  const groupState = useState<GroupModel | null>(null);

  useEffect(() => {
    if (user && groupId) {
      if (!user.groups?.includes(groupId)) {
        addGroupToUserGroups(user.id, groupId).then(() =>
          window.location.reload()
        );
      } else {
        getGroup(groupId).then((group) => groupState[1](group));
      }
    }
  }, [user]);

  return groupState;
}

export function useMembersData(user: User | null | undefined, groupId: string) {
  const membersState = useState<MemberModel[]>([]);

  useEffect(() => {
    if (user && user.groups?.includes(groupId)) {
      getMembers(groupId).then((members) => membersState[1](members));
    }
  }, [user]);

  return membersState;
}
