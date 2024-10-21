import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  where,
} from "firebase/firestore";
import {
  convertCollectionToJavascript,
  convertToJavascript,
  firestore,
} from "@/lib/firebase";
import { EventId, EventModel } from "@/models/Event";
import { GroupId } from "@/models/Group";
import { convertTagIdToReference } from "./tags";
import { MemberId } from "@/models/Member";
import { convertMemberIdToReference } from "./members";
import { currentYearStr } from "@/helper/Time";
import { TagModel } from "@/models/Tag";

export async function getEvents(groupId: GroupId) {
  const events = await getDocs(
    query(
      collection(firestore, "groups", groupId, "events"),
      orderBy("dateEnd", "desc"),
      orderBy("dateStart", "desc")
    )
  );
  return (await convertCollectionToJavascript(events.docs)) as EventModel[];
}

export async function getEventsByTag(groupId: GroupId, tags: TagModel[]) {
  const events = await getDocs(
    query(
      collection(firestore, "groups", groupId, "events"),
      where(
        "tags",
        "array-contains-any",
        tags.map((t) => doc(firestore, "groups", groupId, "tags", t.id))
      ),
      orderBy("dateEnd", "asc"),
      orderBy("dateStart", "asc")
    )
  );
  return (await convertCollectionToJavascript(events.docs)) as EventModel[];
}

// export async function getEventsbyTag(groupId: string, tagIds: TagId[]) {
//   const events = await getDocs(
//     query(
//       collection(firestore, "groups", groupId, "events"),
//       where("tags", "array-contains-any", tagIds),
//       orderBy("dateEnd", "desc"),
//       orderBy("dateStart", "desc")
//     )
//   );
//   return (await convertCollectionToJavascript(events.docs)) as EventModel[];
// }

export async function getEvent(groupId: GroupId, eventId: EventId) {
  const event = await getDoc(
    doc(firestore, "groups", groupId, "events", eventId)
  );
  return (await convertToJavascript(event)) as EventModel;
}

export async function submitEvent(groupId: GroupId, event: EventModel) {
  const { tags, ...eventWithoutTags } = event;
  const addedDoc = await addDoc(
    collection(firestore, "groups", groupId, "events"),
    {
      ...eventWithoutTags,
      tags: tags.map((t) => doc(firestore, "groups", groupId, "tags", t.id)),
    }
  );
  return { ...event, id: addedDoc.id };
}

export async function updateEvent(groupId: GroupId, event: EventModel) {
  await updateDoc(
    doc(firestore, "groups", groupId, "events", event.id),
    convertEventToDocument(groupId, event)
  );
}

export async function deleteEvent(groupId: GroupId, eventId: EventId) {
  await deleteDoc(doc(firestore, "groups", groupId, "events", eventId));
}

function convertEventToDocument(groupId: GroupId, event: EventModel) {
  const { id, tags, members, ...eventWithoutId } = event;
  return {
    ...eventWithoutId,
    tags: tags.map((t) => convertTagIdToReference(groupId, t.id)),
    members:
      members?.map((m) => convertMemberIdToReference(groupId, m.id)) ?? [],
  };
}

export async function addMemberToEvent(
  groupId: GroupId,
  eventId: EventId,
  memberId: MemberId
) {
  await updateDoc(doc(firestore, "groups", groupId, "events", eventId), {
    members: arrayUnion(
      doc(
        firestore,
        "groups",
        groupId,
        "members",
        currentYearStr,
        "members",
        memberId
      )
    ),
  });
}

export async function removeMemberFromEvent(
  groupId: GroupId,
  eventId: EventId,
  memberId: MemberId
) {
  await updateDoc(doc(firestore, "groups", groupId, "events", eventId), {
    members: arrayRemove(
      doc(
        firestore,
        "groups",
        groupId,
        "members",
        currentYearStr,
        "members",
        memberId
      )
    ),
  });
}
