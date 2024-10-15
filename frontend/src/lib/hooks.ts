import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addGroupToUserGroups,
  getUser,
  removeGroupFromUserGroups,
} from "./users";
import { User } from "@/models/User";
import { GroupModel } from "@/models/Group";
import { getGroup } from "./groups";
import { MemberModel } from "@/models/Member";
import { getMembers } from "./members";
import { getEvent } from "./events";
import { EventModel } from "@/models/Event";
import { useRouter } from "next/navigation";
import { Path } from "@/helper/Path";

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
  const router = useRouter();

  useEffect(() => {
    if (user && groupId) {
      if (user.groups?.includes(groupId)) {
        getGroup(groupId).then((group) => {
          if (group) {
            console.log(group);
            groupState[1](group);
          } else {
            removeGroupFromUserGroups(user.id, groupId).then(() =>
              router.push(Path.Group)
            );
          }
        });
      } else {
        addGroupToUserGroups(user.id, groupId).then(() =>
          getGroup(groupId).then((group) => {
            if (group) {
              groupState[1](group);
            } else {
              removeGroupFromUserGroups(user.id, groupId).then(() =>
                router.push(Path.Group)
              );
            }
          })
        );
      }
    }
    // eslint-disable-next-line
  }, [user, groupId]);

  return groupState;
}

export function useMembersData(user: User | null | undefined, groupId: string) {
  const membersState = useState<MemberModel[]>([]);

  useEffect(() => {
    if (user && user.groups?.includes(groupId)) {
      getMembers(groupId).then((members) => membersState[1](members));
    }
    // eslint-disable-next-line
  }, [user, groupId]);

  return membersState;
}

export function useEventData(
  user: User | null | undefined,
  groupId: string,
  eventId: string
) {
  const eventState = useState<EventModel | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user && user.groups?.includes(groupId)) {
      getEvent(groupId, eventId).then((event) => {
        if (event) {
          eventState[1](event);
        } else {
          router.push(Path.Group);
        }
      });
    }
    // eslint-disable-next-line
  }, [user, groupId, eventId]);

  return eventState;
}
