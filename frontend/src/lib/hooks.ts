import {
  auth,
  convertCollectionToJavascript,
  convertToJavascript,
  firestore,
} from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { addGroupToUserGroups, removeGroupFromUserGroups } from "./users";
import { User } from "@/models/User";
import { GroupModel } from "@/models/Group";
import { MemberModel } from "@/models/Member";
import { EventModel } from "@/models/Event";
import { useRouter } from "next/navigation";
import { Path } from "@/helper/Path";
import {
  collection,
  doc,
  documentId,
  Firestore,
  FirestoreError,
  onSnapshot,
  orderBy,
  query,
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  where,
} from "firebase/firestore";
import { MetadataModel } from "@/models/Metadata";
import { currentYearStr } from "@/helper/Time";

export function useUserListener() {
  const [userAuth, loadingAuth] = useAuthState(auth);

  const id = userAuth?.uid || "placeholder";
  const { data: userData } = useFirestoreDoc<User>(
    firestore,
    "users",
    id,
    !loadingAuth
  );

  return userData ? ({ ...userAuth, ...userData, id } as User) : userData;
}

export function useGroupListener(
  user: User | null | undefined,
  groupId: string
) {
  const router = useRouter();
  const onBeforeFetch = async () => {
    if (user && !user.groups?.includes(groupId)) {
      await addGroupToUserGroups(groupId, user?.id);
    }
  };

  const onAfterFetch = async (data: GroupModel | null | undefined) => {
    if (data === undefined && user) {
      removeGroupFromUserGroups(groupId, user?.id).then(() =>
        router.push(Path.Group)
      );
    }
  };

  const { data: group } = useFirestoreDoc<GroupModel>(
    firestore,
    "groups",
    groupId,
    user !== null,
    onBeforeFetch,
    onAfterFetch
  );

  return group;
}

export function useGroupsListener(user: User | null | undefined) {
  const { data: groups } = useFirestoreCol<GroupModel>(
    firestore,
    "groups",
    user !== null,
    where(documentId(), "in", user?.groups ?? ["placeholder"])
  );

  return groups;
}

export function useMembersListener(
  user: User | null | undefined,
  groupId?: string
) {
  const { data: members } = useFirestoreCol<MemberModel>(
    firestore,
    `groups/${groupId}/members/${currentYearStr}/members`,
    user !== null && groupId && user?.groups?.includes(groupId) ? true : false
  );
  return members;
}

export function useMetadataListener(
  user: User | null | undefined,
  groupId?: string
) {
  const { data: metadata } = useFirestoreCol<MetadataModel>(
    firestore,
    `groups/${groupId}/metadata`,
    user !== null && groupId && user?.groups?.includes(groupId) ? true : false,
    undefined,
    orderBy("order", "asc")
  );
  return metadata;
}

export function useTagsListener(
  user: User | null | undefined,
  groupId?: string
) {
  const { data: tags } = useFirestoreCol<MemberModel>(
    firestore,
    `groups/${groupId}/tags`,
    user !== null && groupId && user?.groups?.includes(groupId) ? true : false
  );
  return tags;
}

export function useEventsListener(
  user: User | null | undefined,
  groupId?: string
) {
  const { data: events } = useFirestoreCol<EventModel>(
    firestore,
    `groups/${groupId}/events`,
    user !== null && groupId && user?.groups?.includes(groupId) ? true : false,
    undefined,
    orderBy("dateEnd", "desc")
  );
  return events;
}

export function useEventListener(
  user: User | null | undefined,
  groupId: string,
  eventId: string
) {
  const { data: event } = useFirestoreDoc<EventModel>(
    firestore,
    `groups/${groupId}/events`,
    eventId,
    user !== null,
    async () => {
      if (user && !user.groups?.includes(groupId)) {
        await addGroupToUserGroups(groupId, user?.id);
      }
    }
  );

  return event;
}

const useFirestoreCol = <T>(
  db: Firestore,
  col: string,
  trigger: boolean,
  constraint?: QueryFieldFilterConstraint,
  orderBy?: QueryOrderByConstraint,
  onBeforeFetch?: () => Promise<void>,
  onAfterFetch?: (data: T[] | null) => void
) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (onBeforeFetch) {
        await onBeforeFetch();
      }
      const docRef =
        constraint && orderBy
          ? query(collection(db, col), constraint, orderBy)
          : constraint
          ? query(collection(db, col), constraint)
          : orderBy
          ? query(collection(db, col), orderBy)
          : collection(db, col);

      const unsubscribe = onSnapshot(
        docRef,
        async (document) => {
          const colData = (await convertCollectionToJavascript(
            document.docs
          )) as T[];
          if (colData.length === 0) {
            setData([]);
            setLoading(false);
            if (onAfterFetch) {
              onAfterFetch([]);
            }
          } else {
            setData(colData);
            setLoading(false);
            if (onAfterFetch) {
              onAfterFetch(colData);
            }
          }
        },
        (error) => {
          setError(error);
          setData([]);
          setLoading(false);
        }
      );
      return () => unsubscribe();
    };

    if (trigger) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [db, col, trigger]);

  return { data, loading, error };
};

const useFirestoreDoc = <T>(
  db: Firestore,
  collection: string,
  docId: string,
  trigger: boolean,
  onBeforeFetch?: () => Promise<void>,
  onAfterFetch?: (data: T | null | undefined) => void
) => {
  const [data, setData] = useState<T | null | undefined>(null);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (onBeforeFetch) {
        await onBeforeFetch();
      }
      const docRef = doc(db, collection, docId);
      const unsubscribe = onSnapshot(
        docRef,
        async (document) => {
          if (document.exists()) {
            const docData = await convertToJavascript(document);
            setData(docData as T);
            if (onAfterFetch) {
              onAfterFetch(docData as T);
            }
          } else {
            setData(undefined);
            if (onAfterFetch) {
              onAfterFetch(undefined);
            }
          }
        },
        (error) => {
          setError(error);
          setData(undefined);
        }
      );
      return () => unsubscribe();
    };

    if (trigger) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [db, collection, docId, trigger]);

  return { data, error };
};
