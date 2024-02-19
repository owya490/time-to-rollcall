import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import {
  convertCollectionToJavascript,
  convertToJavascript,
  firestore,
} from "@/lib/firebase";
import { EventId, EventModel, SubmitEventModel } from "@/models/Event";
import { GroupId } from "@/models/Group";
import { convertTagIdToReference } from "./tags";

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

export async function getEvent(groupId: GroupId, eventId: EventId) {
  const event = await getDoc(
    doc(firestore, "groups", groupId, "events", eventId)
  );
  return convertToJavascript(event);
}

export async function submitEvent(groupId: GroupId, event: SubmitEventModel) {
  const { tagIds, ...eventWithoutTagIds } = event;
  const addedDoc = await addDoc(
    collection(firestore, "groups", groupId, "events"),
    {
      ...eventWithoutTagIds,
      tags: tagIds.map((t) => doc(firestore, "groups", groupId, "tags", t)),
    }
  );
  return getEvent(groupId, addedDoc.id);
}

export async function updateEvent(groupId: GroupId, event: EventModel) {
  await setDoc(
    doc(firestore, "groups", groupId, "events", event.id),
    convertEventToDocument(groupId, event)
  );
}

function convertEventToDocument(groupId: GroupId, event: EventModel) {
  const { id, tags, ...eventWithoutId } = event;
  return {
    ...eventWithoutId,
    tags: tags.map((t) => convertTagIdToReference(groupId, t.id)),
  };
}
