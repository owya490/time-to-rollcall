import { collection, getDocs, orderBy, query } from "firebase/firestore";
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
