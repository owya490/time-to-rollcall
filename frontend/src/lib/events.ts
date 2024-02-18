import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { convertCollectionToJavascript, firestore } from "@/lib/firebase";
import { EventModel } from "@/models/Event";

export async function getEvents(groupId: string) {
  const events = await getDocs(
    query(
      collection(firestore, "groups", groupId, "events"),
      orderBy("dateEnd", "desc"),
      orderBy("dateStart", "desc")
    )
  );
  return convertCollectionToJavascript(events.docs) as EventModel[];
}

export async function getEventsbyTag(groupId: string, tagIds: string[]) {
  const events = await getDocs(
    query(
      collection(firestore, "groups", groupId, "events"),
      where("tags", "array-contains-any", tagIds),
      orderBy("dateEnd", "desc"),
      orderBy("dateStart", "desc")
    )
  );
  return convertCollectionToJavascript(events.docs) as EventModel[];
}
